import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { searchFirst, searchStart } from '../../store/searchRequest';
import { loadScheduleList } from '../../store/schedule';
import { validator } from '../../utils/ validator';
import { getCurrentUserId } from '../../store/users';

const SearchPanel = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getCurrentUserId());

  const [data, setData] = useState({
    cityId: '',
    dateStart: null,
    dateEnd: null
  });

  const [dateSchedule, setDateSchedule] = useState([null, null]);

  const [errors, setErrors] = useState({});

  const validatorConfig = {
    cityId: {
      isRequired: {
        message: 'Field is not be empty'
      }
    },
    dateStart: {
      isRequired: {
        message: 'Field is not be empty'
      }
    },
    dateEnd: {
      isRequired: {
        message: 'Field is not be empty'
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data, dateSchedule]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const citiesGeList = useSelector(getCitiesGE())?.map((city) => ({
    label: city.name,
    value: city._id
  }));

  const handleChange = (event) => {
    setData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const handleSearchRequest = () => {
    const newData = {
      cityId: data.cityId,
      dateStart: !!dateSchedule[0] ? dateSchedule[0].getTime() : null,
      dateEnd: !!dateSchedule[1] ? dateSchedule[1].getTime(): null
    };

    if (!isValid || !dateSchedule[0]) return;

    dispatch(searchFirst());
    dispatch(searchStart(newData));

    if (!!userId) {
      dispatch(loadScheduleList());
    }
  }

  return (
    <>
      <Stack
        display='flex'
        direction='row'
        justifyContent='center'
        bgcolor='aliceblue'
        sx={{ pt: '20px', pb: '20px'}}
      >
        <Stack
          justifyItems='center'
          width='200px'
        >
          <FormControl>
            <InputLabel id='location-select-label'>Location</InputLabel>
            <Select
              labelId='location-select-label'
              value={data.cityId}
              label='Location'
              name='cityId'
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
            variant='contained'
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
