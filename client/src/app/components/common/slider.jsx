import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const Slider = () => {
  const images = [
    '/images/s1.jpg',
    '/images/s2.jpg',
    '/images/s3.jpg',
    '/images/s4.jpg',
  ];

  return (
    <>
      <Stack>
        <img
          src={images[0]}
          alt='logo'
        />
      </Stack>
    </>
  );
}

export default Slider;
