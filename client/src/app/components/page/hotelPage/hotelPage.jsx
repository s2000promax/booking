import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getHotelsGeById } from '../../../store/hotelsGE';
import { useHistory, useParams } from 'react-router-dom';
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography
} from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';
import { yellow } from '@mui/material/colors';
import { getSearchRequest, searchClear } from '../../../store/searchRequest';
import { createSchedule, getScheduleRequestStatus } from '../../../store/schedule';
import { getCurrentUserId, getUserById } from '../../../store/users';
import Loader from '../../common/loader';

const HotelPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  const userId = useSelector(getCurrentUserId());
  const user = useSelector(getUserById(userId));

  const currentHotel = useSelector(getHotelsGeById(params.hotelId));
  const imagePath = `/images/${currentHotel.image}.jpg`
  const searchRequest = useSelector(getSearchRequest());
  const currentUserId = useSelector(getCurrentUserId());

  const isScheduleCreated = useSelector(getScheduleRequestStatus());
  const [isCongratulation, setIsCongratulation] = useState(false);

  const [information, setInformation] = useState({
    dateStart: null,
    dateEnd: null,
    nights: null
  });

  useEffect(() => {
    setInformation({
      dateStart: `${new Date(searchRequest.dateStart).getDate()} / ${new Date(searchRequest.dateStart).getMonth() + 1} / ${new Date(searchRequest.dateStart).getFullYear()}`,
      dateEnd: `${new Date(searchRequest.dateEnd).getDate()} / ${new Date(searchRequest.dateEnd).getMonth() + 1} / ${new Date(searchRequest.dateEnd).getFullYear()}`,
      nights: (searchRequest.dateEnd - searchRequest.dateStart) / 1000 / 3600 / 24,
    })
  }, [searchRequest]);

  const handleClick = (event) => {
    switch (event.target.dataset.button) {
      case 'BACK':
        history.push('/');
        break;

      case 'SCHEDULE':
        setIsCongratulation(true);

        dispatch(createSchedule({
          userId: currentUserId,
          hotelId: params.hotelId,
          rooms: 1,
          dateStart: searchRequest.dateStart,
          dateEnd: searchRequest.dateEnd
        }));

        dispatch(searchClear());
        break;

      default:
        break;
    }
  }

  if (!!currentHotel) {
    return (
      <>
        <Stack display='flex'
               width='100%'
               direction='column'
               justifyContent='center'
               alignItems='center'
               sx={{ mt: '20px' }}
        >
          {
            !!isScheduleCreated
            && isCongratulation
            && (
              <>
                <Alert severity="success" sx={{ width: '1000px' }}>
                  <AlertTitle>Success</AlertTitle>
                  <strong>Congratulation!</strong> You scheduled the best hotel!
                </Alert>
              </>
            )
          }
          <Card sx={{ width: '1000px', height: '600px' }}>
            <CardMedia
              component='img'
              height='340'
              image={imagePath}
              alt='green iguana'
              sx={{
                background: '#f5e4ac'
              }}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {currentHotel.name}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {currentHotel.description}
              </Typography>
              {
                !!currentHotel.rate && new Array(currentHotel.rate + 1).fill(null).map((item, index) => (
                  <GradeIcon key={index} sx={{ color: yellow[600] }}/>
                ))
              }
            </CardContent>

            <Stack display='flex' direction='row' justifyContent='space-between'>
              <Stack display='flex' direction='row'>
                {
                  user.type !== 'business' && (
                    <Typography color='text.secondary' sx={{ ml: '20px' }}>
                      Dear guest, you are schedule one room in our hotel {currentHotel.name}
                      <p
                        sx={{ pl: '20px' }}>From {information.dateStart} to {information.dateEnd} for {information.nights} nights</p>
                    </Typography>
                  )
                }
              </Stack>
              <Stack>
                <Typography color='text.primary' sx={{ mr: '10px' }}>{currentHotel.price} {' $'}</Typography>
              </Stack>
            </Stack>

            <CardActions>
              <Button size='small' data-button='BACK' onClick={handleClick}>Back</Button>
              {
                user.type !== 'business' && (
                  <Button size='small' data-button='SCHEDULE' onClick={handleClick}>Schedule</Button>
                )
              }
            </CardActions>
          </Card>
        </Stack>
      </>
    );
  } else {
    return (
      <>
        <Loader type={'1'}/>
      </>
    );
  }
};

export default HotelPage;
