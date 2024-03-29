import React from 'react';
import { Stack, Typography } from '@mui/material';
import SearchPanel from './searchPanel';
import HotelsList from './hotelsList';
import { useSelector } from 'react-redux';
import { getHotelsGE } from '../../store/hotelsGE';
import { getFirstSearchStatus, getSearchRequest } from '../../store/searchRequest';
import { getSchedule, getScheduleRequestStatus } from '../../store/schedule';
import Loader from '../common/loader';

const ScheduleForm = () => {
  const hotelsGE = useSelector(getHotelsGE());

  const isFirstSearched = useSelector(getFirstSearchStatus());
  const isLoading = useSelector(getScheduleRequestStatus());

  const searchRequest = useSelector(getSearchRequest());
  const scheduleList = useSelector(getSchedule());
  const indexes = [];
  const hotelsGeByCityFilter = [];
  const onLineSchedule = [];

  if (!!searchRequest) {
    hotelsGE.forEach(hotel => {
      if (hotel.location === searchRequest.cityId) {
        hotelsGeByCityFilter.push(hotel);
      }
    });

    hotelsGeByCityFilter.forEach((hotel, index) => {
      scheduleList.forEach(schedule => {
        if (schedule.hotelId === hotel._id
          && !(searchRequest.dateEnd <= schedule.dateStart * 1)
          && !(searchRequest.dateStart >= schedule.dateEnd * 1)
        ) {
          indexes.push(index);
        }
      })
    });

    hotelsGeByCityFilter.forEach((hotel, index) => {
      if (!indexes.includes(index)) {
        onLineSchedule.push(hotel);
      }
    });
  }

  return (
    <>
      <Stack
        display='flex'
        width='100%'
      >
        <SearchPanel/>
        {
          isLoading
          && isFirstSearched
          && <Loader type={'2'}/>
        }
        <Stack
          height='100%'
          display='flex'
          direction='column'
          justifyContent='space-between'
          alignItems='center'
          bgcolor='#f3d79a'
        >
          <Typography sx={{ mt: '0px' }} variant='h6'>
            {!!isFirstSearched
              ? `Founded ${onLineSchedule.length} results:`
              : ``
            }
          </Typography>
          <HotelsList onLineSchedule={onLineSchedule}/>
        </Stack>
      </Stack>
    </>
  );
};

export default ScheduleForm;
