import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Button, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import { getCitiesGE } from '../../store/citiesGE';
import { Search } from '@mui/icons-material';
import { searchClear } from '../../store/searchRequest';

const UserCard = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const citiesGE = useSelector(getCitiesGE());

  const handleClick = () => {
    history.push(history.location.pathname + '/edit');
  };

  const handleBackToSearch = () => {
    history.push('/');
    dispatch(searchClear());

  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            width: '400px',
            height: '600px',
          },
        }}
      >

        <Paper elevation={12} sx={{ width: '100%' }}>
          <Stack sx={{ width: '100%', height: '7%', pr: '10px', alignItems: 'end' }}>
            <IconButton edge="end" aria-label="delete" data-scheduleId={'id'}>
              <Settings onClick={handleClick}/>
            </IconButton>
          </Stack>
          <Stack display='flex' direction='column' sx={{ width: '100%', height: '93%' }}>
            <Avatar sx={{ width: '250px', height: '250px', ml: '75px', mb: '20px' }}>
              <img
                src={user.image}
                alt=""
                height="230"
                className="img-responsive rounded-circle"
              />
            </Avatar>
            <Divider/>
            <Typography variant='h5' sx={{ ml: '10px', mt: '10px', mb: '10px' }}>
              <strong>Name:</strong> &nbsp;
              {user.name}
            </Typography>
            <Divider/>
            <Typography variant='h5' sx={{ ml: '10px', mt: '10px', mb: '10px' }}>
              <strong>From:</strong> &nbsp;
              {citiesGE[citiesGE.findIndex(item => item._id === user.location)].name}
            </Typography>
            <Divider/>
            <Typography variant='h5' sx={{ ml: '10px', mt: '10px', mb: '10px' }}>
              <strong>Status:</strong> &nbsp;
              {user.type === 'client' ? (
                  <span style={{ color: 'goldenrod' }}>Genius 3 level</span>
                )
                : (
                  <span>Business account</span>
                )}
            </Typography>
            <Divider/>

            <Stack>
              <Button
                variant='contained'
                endIcon={<Search/>}
                sx={{
                  width: '180px',
                  height: '55px',
                  mt: '35px',
                  ml: '110px'
                }}
                onClick={handleBackToSearch}
              >
                Back to Search
              </Button>
            </Stack>
          </Stack>
        </Paper>

      </Box>
    </>
  );
};
UserCard.propTypes = {
  user: PropTypes.object
};

export default UserCard;
