import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../../store/users';
import {
  Avatar, Divider, IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { getSchedule, loadScheduleList, removeSchedule } from '../../../store/schedule';
import { getHotelsGE } from '../../../store/hotelsGE';
import AddHotelForm from '../../ui/addHotelForm';
import UserCard from '../../ui/userCard';
import UserScheduleList from '../../ui/userScheduleList';
import OwnerHotelsList from '../../ui/ownerHotelsList';


const UserPage = ({ user }) => {

  const userId = user._id;

  const dispatch = useDispatch();
  const hotelsGE = useSelector(getHotelsGE());


  const [addHotel, setAddHotel] = useState(false);


  const handleDelete = (event) => {

    console.log(event.target.closest('button').dataset.scheduleid);
    dispatch(removeSchedule(event.target.closest('button').dataset.scheduleid))
  }

  const handleClick = (event) => {
    setAddHotel(prevState => !prevState);
  }

  return (
    <>
      <Stack
        display='flex'
        direction='row'
        width='100%'
        height='100vh'
      >
        <Stack width='30%' alignItems='center' sx={{ mt: '20px' }}>
          <UserCard user={user}/>
        </Stack>

        <Stack width='70%' alignItems='center' sx={{ mt: '20px' }}>
          {user.type === 'client' ? (
              <UserScheduleList userId={user._id}/>
            )
            : (
              <>
                <OwnerHotelsList userId={user._id} />
              </>
            )}
        </Stack>

      </Stack>
    </>
  );

};

UserPage.propTypes = {
  user: PropTypes.object
};

export default UserPage;


/*
 <>
                  <AddHotelForm userId={userId}/>
                </>
 */