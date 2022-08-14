import React, { cloneElement, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../store/users";
import {
  Avatar, Button, Divider, IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

import { getSchedule, loadScheduleList, removeSchedule } from '../../../store/schedule';
import { getHotelsGE, getHotelsGeById } from '../../../store/hotelsGE';
import { useHistory } from 'react-router-dom';
import AddHotelForm from '../../ui/addHotelForm';
import UserCard from '../../ui/userCard';


const UserPage = ({ userId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const hotelsGE = useSelector(getHotelsGE());
  const user = useSelector(getUserById(userId));
  const schedule = useSelector(getSchedule());

  const [addHotel, setAddHotel] = useState(false);

  const scheduleInfo = [];
  console.log(user)
  console.log(schedule)

  schedule?.map(item => {
    scheduleInfo.push({
      scheduleId: item._id,
      hotelName: hotelsGE[hotelsGE.findIndex(hotel => hotel._id === item.hotelId)].name,
      dateStart: `${new Date(item.dateStart * 1).getDate()} / ${new Date(item.dateStart * 1).getMonth()} / ${new Date(item.dateStart * 1).getFullYear()}`,
      dateEnd: `${new Date(item.dateEnd * 1).getDate()} / ${new Date(item.dateEnd * 1).getMonth()} / ${new Date(item.dateEnd * 1).getFullYear()}`,
      nights: (item.dateEnd - item.dateStart) / 1000 / 3600 / 24,
      rooms: item.rooms
    })
  });
  console.log(scheduleInfo)

  const handleDelete = (event) => {

    console.log(event.target.closest('button').dataset.scheduleid);
    dispatch(removeSchedule(event.target.closest('button').dataset.scheduleid))
  }

  const handleClick = (event) => {
    setAddHotel(prevState => !prevState);
  }


  if (user.type === 'client') {
    return (
      <>
        <Stack
          display='flex'
          direction='row'
          width='100%'
          height='100vh'

        >
          <UserCard user={user} />



          <Stack width='70%' bgcolor='green' alignItems='center'>

            <List sx={{ mt: '5px', width: '100%', maxWidth: '500px', bgcolor: 'background.paper' }}>
              {
                scheduleInfo.map((item, index) => (
                  <>
                    <ListItem alignItems="flex-start" key={`schedule-list-${index}`}>
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.hotelName}
                        secondary={
                          <>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              From {item.dateStart} to {item.dateEnd} for {item.nights} nights
                            </Typography>
                            {' '}
                          </>
                        }
                      />
                      <IconButton edge="end" aria-label="delete" data-scheduleId={item.scheduleId}>
                        <DeleteIcon onClick={handleDelete} />
                      </IconButton>
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                  </>
                ))
              }


            </List>


          </Stack>

        </Stack>
      </>
    );
  } else if (user.type === 'business') {
    return (
      <>
        <Stack
          display='flex'
          direction='row'
          width='100%'
          height='100vh'

        >
          <Stack alignItems='center' justifyContent='center' width='30%' bgcolor='yellow'>
            <UserCard user={user} />

            <Stack alignItems='center' justifyContent='center' width='30%' bgcolor='yellow'>


              <button
                type='button'
                className='btn btn-primary w-100 mx-auto'
                onClick={handleClick}
              >
                {addHotel ? 'Show my hotels' : 'Add new hotel'}
              </button>

            </Stack>

          </Stack>
          <Stack width='70%' bgcolor='green' alignItems='center'>

            {addHotel
              ? (
                <>
                  <AddHotelForm userId={userId} />
                </>
              )
              : (
                <>
                  <Typography>List of my Hotels</Typography>
                  <List sx={{ mt: '5px', width: '100%', maxWidth: '500px', bgcolor: 'background.paper' }}>
                    {
                      hotelsGE.filter(item => item.owner === userId).map((item, index) => (
                        <>
                          <ListItem alignItems="flex-start" key={`schedule-list-${index}`}>
                            <ListItemAvatar>
                              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                            </ListItemAvatar>
                            <ListItemText
                              primary={item.name}
                              secondary={
                                <>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    Total {item.roomsNumber}. Booking {'1'}. Free {item.roomsNumber - 1}
                                  </Typography>
                                  {' '}
                                </>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li"/>
                        </>
                      ))
                    }


                  </List>
                </>
              )}


          </Stack>

        </Stack>
      </>
    );
  }
  {
    return <h1>Loading</h1>;
  }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;


