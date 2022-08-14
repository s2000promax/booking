import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';
import { yellow } from '@mui/material/colors';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUserId, getUserById } from '../../store/users';

const HotelCard = ({ _id, name, description, rate }) => {
const history = useHistory();

const handleClick = (event) => {
  const hotelId = event.target.dataset.id;
  console.log();
  history.push(`/hotels/${hotelId}`);
}
  return (
    <>
      <Card sx={{ width: 380 }}>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          {
            !!rate && new Array(rate).fill(null).map((item, index) => (
              <GradeIcon key={index} sx={{ color: yellow[600] }}/>
            ))
          }
        </CardContent>
        <CardActions>
          <Button size="small" data-id={_id} onClick={handleClick}>Open</Button>
        </CardActions>
      </Card>
    </>
  );
}

export default HotelCard;