import React, { useEffect, useState } from 'react';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getHotelsGE } from '../../store/hotelsGE';
import { getSearchRequest, getSearchStatus } from '../../store/searchRequest';
import HotelCard from './hotelCard';
import { paginate } from '../../utils/paginate';
import { loadScheduleList } from '../../store/schedule';

const HotelsList = () => {

  const hotelsGE = useSelector(getHotelsGE());

  const isSearch = useSelector(getSearchStatus());
  const searchRequest = useSelector(getSearchRequest());
  const cityId = searchRequest?.cityId;

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const onLineSchedule = hotelsGE?.filter(item => item.location === cityId);
  const count = Math.ceil(onLineSchedule?.length / pageSize);
  const onLineScheduleCrop = paginate(onLineSchedule, currentPage, pageSize);
  console.log('###-', onLineSchedule);

  useEffect(() => {

  }, [searchRequest]);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Stack
        height='100%'
        display='flex'
        direction='column'
        justifyContent='space-between'
        alignItems='center'
      >
        <Stack
          display='flex'
          direction='column'
          alignItems="center"
        >
          <Typography sx={{ mt: '5px' }}>{!!onLineSchedule?.length && (
            <h6>Founded {onLineSchedule.length} results:</h6>
          )}</Typography>
          <Box
            display='flex'
            direction='column'
            flexWrap='wrap'
            width='1300px'
            // bgcolor='yellow'
            justifyContent='center'
          >

            {!!onLineScheduleCrop?.length &&
              onLineScheduleCrop.map(item => (
                <Stack sx={{ ml: '20px', mb: '20px' }}>
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
      </Stack>

    </>
  );
}

export default HotelsList;
