import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Stack,
  Select,
  Box,
  TextField, Button
} from '@mui/material';

import { Search } from '@mui/icons-material';


import { getCitiesGE } from '../../store/citiesGE';
import { searchStart } from '../../store/searchRequest';

const SearchPanel = () => {
  const dispatch = useDispatch();

  const citiesGeList = useSelector(getCitiesGE())?.map((city) => ({
    label: city.name,
    value: city._id
  }));

  const [cityId, setCityId] = useState('');
  const [dateSchedule, setDateSchedule] = useState([null, null]);

  const handleChange = (event) => {
    setCityId(event.target.value);
  };

  const handleSearchRequest = () => {
    dispatch(searchStart({
      cityId,
      dateStart: dateSchedule[0].getTime(),
      dateEnd: dateSchedule[1].getTime()
    }));
  }

  return (
    <>
      <Stack
        display='flex'
        direction='row'
        justifyContent='center'
      >
        <Stack
          justifyItems='center'

          width='200px'
        >
          <FormControl>
            <InputLabel id="location-select-label">Location</InputLabel>
            <Select
              labelId="location-select-label"
              id="location-select"
              value={cityId}
              label="Location"
              onChange={handleChange}
            >
              {!!citiesGeList?.length &&
                citiesGeList.map((city) => (
                  <MenuItem value={city.value} key={city.value}>{city.label}</MenuItem>
                ))
              }
            </Select>
            <FormHelperText sx={{ color: 'red' }}></FormHelperText>
          </FormControl>
        </Stack>

        <Stack
          width='500px'
          sx={{
            ml: '16px',
          }}
        >
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            localeText={{ start: 'Check-in', end: 'Check-out' }}
          >
            <DateRangePicker
              value={dateSchedule}
              onChange={(newDateSchedule) => {
                setDateSchedule(newDateSchedule);
              }}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </>
              )}
            />
          </LocalizationProvider>
        </Stack>

        <Stack>
          <Button
            variant="contained"
            endIcon={<Search/>}
            sx={{
              ml: '16px',
              height: '55px'
            }}
            onClick={handleSearchRequest}
          >
            Search
          </Button>
        </Stack>


      </Stack>
    </>
  );
};

export default SearchPanel;
