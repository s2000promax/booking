import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";
import { Button, Stack, Typography } from '@mui/material';

const NavBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const history = useHistory();
  return (
    <>
        <Stack
          bgcolor='#003580'
          display='flex'
          direction='row'
          justifyContent='space-between'
          width='100%'
          alignItems='center'>
          <Stack sx={{ m: '10px', color: '#FFFFFF' }}>
            <Link to='/' style={{ textDecoration: 'none', color: '#e1dede' }}>
              <Typography variant='h4'>Find your next stay</Typography>
              <Typography variant='h5'>Search deals on hotels, homes, and much more...</Typography>
            </Link>
          </Stack>
          <Stack sx={{ m: '10px' }}>

            <Typography>
              {isLoggedIn ? (
                <NavProfile/>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color='inherit'
                    sx={{ color: '#186fea' }}
                    onClick={() => history.push('login/register')}
                  >
                    Register
                  </Button>
                  <Button
                    variant="contained"
                    color='inherit'
                    sx={{ ml: '10px', color: '#186fea' }}
                    onClick={() => history.push('login')}
                  >
                    Sign in
                  </Button>
                </>
              )}
            </Typography>
          </Stack>
        </Stack>
    </>
  );
};

export default NavBar;
