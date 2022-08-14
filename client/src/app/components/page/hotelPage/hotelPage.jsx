import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { getHotelsGeById } from '../../../store/hotelsGE';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';
import { yellow } from '@mui/material/colors';
import { getSearchRequest, searchClear } from '../../../store/searchRequest';
import { createSchedule } from '../../../store/schedule';
import { getCurrentUserId, getUserById } from '../../../store/users';

const HotelPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  const userId = useSelector(getCurrentUserId());
  const user = useSelector(getUserById(userId));

  const currentHotel = useSelector(getHotelsGeById(params.hotelId));
  const searchRequest = useSelector(getSearchRequest());
  const currentUserId = useSelector(getCurrentUserId());

  const [information, setInformation] = useState({
    dateStart: null,
    dateEnd: null,
    nights: null
  });

  useEffect(() => {
    setInformation({
      dateStart: `${new Date(searchRequest.dateStart).getDate()} / ${new Date(searchRequest.dateStart).getMonth()} / ${new Date(searchRequest.dateStart).getFullYear()}`,
      dateEnd: `${new Date(searchRequest.dateEnd).getDate()} / ${new Date(searchRequest.dateEnd).getMonth()} / ${new Date(searchRequest.dateEnd).getFullYear()}`,
      nights: (searchRequest.dateEnd - searchRequest.dateStart) / 1000 / 3600 / 24,
    })
  }, [searchRequest]);

  const handleClick = (event) => {
    switch (event.target.dataset.button) {
      case 'BACK':
        history.push('/');
        break;
      case 'SCHEDULE': {
        dispatch(createSchedule({
          userId: currentUserId,
          hotelId: params.hotelId,
          rooms: 1,
          dateStart: searchRequest.dateStart,
          dateEnd: searchRequest.dateEnd
        }));

        // Need Congratulations page!!!
        dispatch(searchClear());
        history.push('/');

      }
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
               height='100vh'
               direction='column'
               justifyContent='center'
               alignItems='center'
        >
          <Card sx={{ width: '1000px', height: '600px' }}>
            <CardMedia
              component="img"
              height="340"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
              sx={{
                background: '#f5e4ac'
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {currentHotel.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
              {
                !!currentHotel.rate && new Array(currentHotel.rate).fill(null).map((item, index) => (
                  <GradeIcon key={index} sx={{ color: yellow[600] }}/>
                ))
              }
            </CardContent>
            {
              user.type !== 'business' && (
                <Typography color="text.secondary" sx={{ ml: '20px' }}>
                  Dear guest, you are schedule one room in our hotel {currentHotel.name}
                  <p
                    sx={{ pl: '20px' }}>From {information.dateStart} to {information.dateEnd} for {information.nights} nights</p>
                </Typography>
              )
            }

            <CardActions>
              <Button size="small" data-button='BACK' onClick={handleClick}>Back</Button>
              {
                user.type !== 'business' && (
                  <Button size="small" data-button='SCHEDULE' onClick={handleClick}>Schedule</Button>
                )
              }
            </CardActions>
          </Card>
        </Stack>
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default HotelPage;
