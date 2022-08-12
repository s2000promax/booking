import React, { useEffect, useState } from 'react';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radio.Field';
import { useSelector, useDispatch } from 'react-redux';
import { getCitiesGE } from '../../store/citiesGE';
import { Stack } from '@mui/material';
import SearchPanel from './searchPanel';
import { getSearchRequest, getSearchStatus, searchFinish } from '../../store/searchRequest';
import HotelCard from './hotelCard';
import HotelsList from './hotelsList';

const ScheduleForm = () => {
  const dispatch = useDispatch();





  const [data, setData] = useState({
    userId: '',
    hotelId: '',
    rooms: 0,
    dateStart: new Date(),
    dateEnd: new Date()
  });


  return (
    <>
      <Stack
        display='flex'
        width='100%'
      >
        <Stack
        bgcolor="aliceblue"
        >
          <SearchPanel />
        </Stack>
        <Stack
        bgcolor="antiquewhite"

        >
          <HotelsList />
        </Stack>
      </Stack>
    </>
  );
};

export default ScheduleForm;
