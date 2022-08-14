import React, { cloneElement, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../store/users";
import {
  Avatar, Divider, IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { getSchedule, loadScheduleList, removeSchedule } from '../../../store/schedule';
import { getHotelsGE, getHotelsGeById } from '../../../store/hotelsGE';


const UserPage = ({ userId }) => {
  const dispatch = useDispatch();
  const hotelsGE = useSelector(getHotelsGE());
  const user = useSelector(getUserById(userId));
  const schedule = useSelector(getSchedule());

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


  if (user.type === 'client') {
    return (
      <>
        <Stack
          display='flex'
          direction='row'
          width='100%'
          height='100vh'

        >
          <Stack alignItems='center' justifyContent='center' width='30%' bgcolor='yellow'>
            <Paper

              sx={{
                width: '400px',
                height: '600px'
              }}
            >
              {Object.keys(user).map(key => (
                <Typography key={key}>
                  {key} {':'}
                  <span>{' '} {user[key]}</span>
                </Typography>
              ))}
            </Paper>
          </Stack>
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
            <Paper

              sx={{
                width: '400px',
                height: '600px'
              }}
            >
              {Object.keys(user).map(key => (
                <Typography key={key}>
                  {key} {':'}
                  <span>{' '} {user[key]}</span>
                </Typography>
              ))}
            </Paper>
          </Stack>
          <Stack width='70%' bgcolor='green' alignItems='center'>




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


