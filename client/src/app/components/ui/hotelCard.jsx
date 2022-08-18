import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';
import { yellow } from '@mui/material/colors';
import { useHistory } from 'react-router-dom';

const HotelCard = ({ _id, name, description, rate, price, image }) => {
const history = useHistory();

const imagePath = `/images/${image}.jpg`

const handleClick = (event) => {
  const hotelId = event.target.dataset.id;
  history.push(`/hotels/${hotelId}`);
}
  return (
    <>
      <Card sx={{ width: '380px', height: '350px', m: 0 }} key={`hotel-card-${_id}`}>
        <Stack
          display='flex'
          direction='column'
          width='100%'
          justifyContent='space-between'
        >
          <Stack>
            <CardMedia
              component='img'
              height='140'
              image={imagePath}
              alt='hotel image'
            />
          </Stack>
        <Stack height='145px'>
          <CardContent>
            <Stack
              display='flex'
              direction='column'
              width='100%'
              justifyContent='space-between'
            >
            <Typography variant='h5' component='div' sx={{ mt: '-10px' }}>
              {name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {description}
            </Typography>
            </Stack>
          </CardContent>
        </Stack>
        <Stack>
          <Stack display='flex' direction='row' justifyContent='space-between' sx={{ ml: '15px', mr: '15px' }}>
            <Stack display='flex' direction='row'>
              {
                !!rate && new Array(rate + 1).fill(null).map((item, index) => (
                  <GradeIcon key={index} sx={{ color: yellow[600] }}/>
                ))
              }
            </Stack>
            <Stack>
              <Typography color='text.primary'>{price} {' $'}</Typography>
            </Stack>
          </Stack>
          <CardActions>
            <Button size='small' data-id={_id} onClick={handleClick}>Open</Button>
          </CardActions>
        </Stack>
        </Stack>
      </Card>
    </>
  );
}

export default HotelCard;
