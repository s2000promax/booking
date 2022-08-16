import React from 'react';
import { Stack } from '@mui/material';

const Footer = () => {

  return (
    <>
      <Stack
        display='flex'
        direction='column'
        width='1300px'
      >
        <Stack bgcolor='#e3e3e3'>1</Stack>
        <Stack bgcolor='#a4a4a4'>2</Stack>
        <Stack bgcolor='#dedede'>3</Stack>

      </Stack>
    </>
  );
}

export default Footer;
