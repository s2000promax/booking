import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@mui/material';

import UserCard from '../../ui/userCard';
import UserScheduleList from '../../ui/userScheduleList';
import OwnerHotelsList from '../../ui/ownerHotelsList';


const UserPage = ({ user }) => {

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
