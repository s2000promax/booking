import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';

import { useDispatch, useSelector } from 'react-redux';
import { getHotelsGE, getOwnerHotels } from '../../store/hotelsGE';
import { IconButton, TextField, Typography } from '@mui/material';
import { getCitiesGE } from '../../store/citiesGE';
import { useHistory } from 'react-router-dom';
import { getSchedule, loadScheduleList } from '../../store/schedule';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';

const OwnerHotelsList = ({ userId }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [date, setDate] = useState(null);

  useEffect(() => {
    dispatch(loadScheduleList());
  }, [date]);

  const citiesGE = useSelector(getCitiesGE());
  const hotelsGE = useSelector(getHotelsGE());
  const hotels = useSelector(getOwnerHotels(userId));
  const schedule = useSelector(getSchedule()).filter(item => item.dateStart * 1 <= date.getTime() && item.dateEnd * 1 >= date.getTime());

  const scheduledHotels = [];

  schedule.forEach(sch => {
    scheduledHotels.push(...hotelsGE.filter(h => h._id === sch.hotelId));
  });

  const hotelsRender = [];

  hotels.forEach((hOwner) => {
    hotelsRender.push({
      ...hOwner,
      roomsScheduled: scheduledHotels
        .filter(hSchedule => hSchedule.owner === userId)
        .filter(h => h._id === hOwner._id).length
    })
  });

  const addHotelComponent = () => (
    <>
      <IconButton edge='center'>
        <AddIcon onClick={() => history.push(`/addnewhotel/${userId}`)}/>
      </IconButton>
    </>
  );

  const showCalendar = () => (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label=''
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );

  const columns = [
    {
      field: 'id', headerName: '№', width: 50, sortable: false,
    },
    {
      field: 'hotelName',
      headerName: 'Hotels name',
      width: 250,
      editable: false,
      sortable: false,

    },
    {
      field: 'city',
      headerName: 'City',
      width: 150,
      editable: false,
      sortable: false,

    },
    {
      field: 'roomsNumber',
      headerName: 'Total rooms',
      width: 150,
      editable: false,
      sortable: true,
    },
    {
      field: 'scheduled',
      headerName: 'Scheduled',
      width: 150,
      editable: false,
      sortable: true,
    },
    {
      field: 'free',
      headerName: 'Free',
      sortable: true,
      width: 150,
      editable: false,
    },
    {
      field: 'date',
      headerName: showCalendar,
      sortable: false,
      width: 170,
      editable: false,
    },
    {
      field: 'add',
      headerName: addHotelComponent,
      sortable: false,
      width: 60,
      editable: false,
    }
  ];

  const rows = hotelsRender.map((item, index) => {
    return {
      id: index + 1,
      hotelName: item.name,
      city: citiesGE[citiesGE.findIndex(city => city._id === item.location)].name,
      roomsNumber: item.roomsNumber,
      scheduled: item.roomsScheduled,
      free: item.roomsNumber - item.roomsScheduled,
    }
  });

  return (
    <>
      {!!hotelsRender.length
        ? (
          <>
            <Box sx={{ height: '600px', width: '1152px', display: 'flex' }}>
              <DataGrid
                disableColumnMenu={true}
                rows={rows}
                columns={columns}
                pageSize={8}
                checkboxSelection={false}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </>
        )
        : (
          <>
            <Typography>You don't have reservation yet</Typography>
          </>
        )
      }
    </>
  );
};

OwnerHotelsList.propTypes = {
  userId: PropTypes.string.isRequired
};

export default OwnerHotelsList;
