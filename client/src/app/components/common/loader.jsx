import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, LinearProgress } from '@mui/material';

const Loader = ({ type }) => {
  switch (type) {
    case '1':
      return (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      );
    case '2':
      return (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      );
    default:
      return (
        <div>Loading...</div>
      );
  }
};

Loader.propTypes = {
  type: PropTypes.string
};

export default Loader;
