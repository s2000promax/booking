import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Stack,
  Select,
  TextField, Button
} from '@mui/material';

import { Search } from '@mui/icons-material';

import { getCitiesGE, getCitiesGeLoadingStatus } from '../../store/citiesGE';
import { searchClear, searchFirst, searchStart } from '../../store/searchRequest';
import { validator } from '../../utils/ validator';
import Loader from '../common/loader';
import { loadScheduleList } from '../../store/schedule';
import { getDateNowWithoutTime } from '../../utils/displayDate';

const SearchPanel = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getCitiesGeLoadingStatus());
  const citiesGe = useSelector(getCitiesGE());
  const citiesGeList = [];

  if (!isLoading && Array.isArray(citiesGe)) {
    citiesGe.forEach(city => {
      citiesGeList.push({
        label: city.name,
        value: city._id
      });
    });
  }

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
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (event) => {
    if (event.target.name === 'cityId') {
      dispatch(searchClear());
    }
    setData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const handleSearchRequest = () => {

    const newData = {
      cityId: data.cityId,
      dateStart: !!dateSchedule[0] ? dateSchedule[0].getTime() : null,
      dateEnd: !!dateSchedule[1] ? dateSchedule[1].getTime() : null
    };

    if (!!isValid && !!dateSchedule[0] && !!dateSchedule[1]) {
      if (!(getDateNowWithoutTime()<= dateSchedule[0].getTime())) return;
    } else return;

    dispatch(loadScheduleList());
    dispatch(searchFirst());
    dispatch(searchStart(newData));
  }

  return (
    <>
      {
        !isLoading
          ? (
            <>
              <Stack
                display='flex'
                direction='row'
                justifyContent='center'
                bgcolor='aliceblue'
                sx={{ pt: '20px', pb: '20px' }}
              >
                <Stack
                  justifyItems='center'
                  width='230px'
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
                      {!!citiesGeList.length &&
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
                          <TextField {...endProps} sx={{ ml: '16px' }}/>
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
                      ml: '-6px',
                      width: '180px',
                      height: '55px'
                    }}
                    onClick={handleSearchRequest}
                  >
                    Search
                  </Button>
                </Stack>
              </Stack>
            </>
          )
          : (
            <>
              <Loader type={'2'}/>
            </>
          )
      }
    </>
  );
};

export default SearchPanel;
