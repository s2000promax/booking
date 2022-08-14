import React, { useState } from 'react';
import { Box, Pagination, Stack,  } from '@mui/material';
import HotelCard from './hotelCard';
import { paginate } from '../../utils/paginate';

const HotelsList = ({ onLineSchedule }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const count = Math.ceil(onLineSchedule?.length / pageSize);
  const onLineScheduleCrop = paginate(onLineSchedule, currentPage, pageSize);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
        <Stack
          display='flex'
          direction='column'
          alignItems="center"
        >

          <Box
            display='flex'
            direction='column'
            flexWrap='wrap'
            width='1300px'
            justifyContent='center'
          >
            {!!onLineScheduleCrop?.length &&
              onLineScheduleCrop.map(item => (
                <Stack sx={{ ml: '20px', mb: '20px' }} key={item._id}>
                  <HotelCard {...item} key={item._id}/>
                </Stack>
              ))
            }
          </Box>
        </Stack>
        <Stack
          spacing={2}
        >
          {
            !!count && count !== 1
            && <Pagination count={count} page={currentPage} onChange={handleChange}/>
          }
        </Stack>
    </>
  );
}

export default HotelsList;
