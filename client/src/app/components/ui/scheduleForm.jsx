import React from 'react';
import { Stack, Typography } from '@mui/material';
import SearchPanel from './searchPanel';
import HotelsList from './hotelsList';
import { useSelector } from 'react-redux';
import { getHotelsGE } from '../../store/hotelsGE';
import { getFirstSearchStatus, getSearchRequest } from '../../store/searchRequest';

const ScheduleForm = () => {
  const hotelsGE = useSelector(getHotelsGE());
  const isFirstSearched = useSelector(getFirstSearchStatus());
  const searchRequest = useSelector(getSearchRequest());
  const cityId = searchRequest?.cityId;
  const onLineSchedule = hotelsGE?.filter(item => item.location === cityId);

  return (
    <>
      <Stack
        display='flex'
        width='100%'
      >
        <SearchPanel />

        <Stack
          height='100%'
          display='flex'
          direction='column'
          justifyContent='space-between'
          alignItems='center'
          bgcolor='#f3d79a'
        >
        <Typography sx={{ mt: '0px' }}>{isFirstSearched && (
          <h6>Founded {onLineSchedule.length} results:</h6>
        )}</Typography>
        <HotelsList onLineSchedule={onLineSchedule}/>
        </Stack>

      </Stack>
    </>
  );
};

export default ScheduleForm;
