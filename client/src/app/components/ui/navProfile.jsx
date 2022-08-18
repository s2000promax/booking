import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentUserData } from '../../store/users';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { Logout } from '@mui/icons-material';
import Loader from '../common/loader';

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData());

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!currentUser) return <Loader type={'1'} />;

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {/*<Typography variant='h6' sx={{ color: '#e1dede' }}>{currentUser.name}</Typography>*/}
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 48, height: 48 }}>
              <img
                src={currentUser.image}
                alt=""
                height="40"
                className="img-responsive rounded-circle"
              />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link
          to={`/users/${currentUser._id}`}
          style={{ textDecoration: 'none', color: '#3E3E3E' }}
        >
          <MenuItem>
            <Avatar/>
            Profile
          </MenuItem>
        </Link>
        <Divider/>
        <Link
          to="/logout"
          style={{ textDecoration: 'none', color: '#3E3E3E' }}
        >
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small"/>
            </ListItemIcon>
            Logout
          </MenuItem>
        </Link>

      </Menu>
    </>
  );
};

export default NavProfile;
