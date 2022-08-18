import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const Footer = () => {

  return (
    <>
      {/*<Box height={window.innerHeight - 280} width='100%' bgcolor='white'></Box>*/}
      <Stack
        display='flex'
        direction='column'
        alignItems='center'
        sx={{ mt: '25px' }}
      >
        <Stack>
          <Typography fontSize='0.8em'>
            Copyright © 1996–2022 Reservation.com™. All rights reserved.
          </Typography>
        </Stack>
        <Stack>
          <Typography fontSize='0.8em'>
            Reservation.com is part of Reservation Holdings Inc., the world leader in online travel and related services.
          </Typography>
        </Stack>
        <Stack width='800px'>
          <Box display='flex' direction='row' height='35px' alignItems='center' justifyContent='space-around'>
            <Stack>
              <img
                height='35px'
                width='117px'
                src='/images/b.png'
                alt='logo'
              />
            </Stack>
            <Stack>
              <img
                height='35px'
                width='101px'
                src='/images/p.png'
                alt='logo'
              />
            </Stack>
            <Stack>
              <img
                height='35px'
                width='91px'
                src='/images/k.png'
                alt='logo'
              />
            </Stack>
            <Stack>
              <img
                height='35px'
                width='71px'
                src='/images/a.png'
                alt='logo'
              />
            </Stack>
            <Stack>
              <img
                height='35px'
                width='112px'
                src='/images/r.png'
                alt='logo'
              />
            </Stack>
            <Stack>
              <img
                height='35px'
                width='100px'
                src='/images/o.png'
                alt='logo'
              />
            </Stack>
          </Box>
        </Stack>

      </Stack>
    </>
  );
}

export default Footer;
