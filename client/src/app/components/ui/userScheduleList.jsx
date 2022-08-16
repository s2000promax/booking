import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';

import { useDispatch, useSelector } from 'react-redux';
import { getScheduleByUserId, removeSchedule } from '../../store/schedule';
import { getHotelsGE } from '../../store/hotelsGE';
import { IconButton, Typography } from '@mui/material';
import { getDateDDMMYYY } from '../../utils/displayDate';
import { getCitiesGE } from '../../store/citiesGE';

const UserScheduleList = ({ userId }) => {
  const dispatch = useDispatch();

  const citiesGE = useSelector(getCitiesGE());
  const hotelsGE = useSelector(getHotelsGE());
  const schedule = useSelector(getScheduleByUserId(userId));
  const scheduleInfo = [];

  schedule.forEach(item => {
    scheduleInfo.push({
      scheduleId: item._id,
      hotelName: hotelsGE[hotelsGE.findIndex(hotel => hotel._id === item.hotelId)].name,
      city: citiesGE[citiesGE.findIndex(city => city._id === hotelsGE[hotelsGE.findIndex(hotel => hotel._id === item.hotelId)].location)].name,
      dateStart: item.dateStart,
      dateEnd: item.dateEnd,
      nights: (item.dateEnd - item.dateStart) / 1000 / 3600 / 24,
      rooms: item.rooms
    });
  });

  const columns = [
    {
      field: 'id', headerName: 'Reservation code', width: 250, sortable: false,
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
      field: 'dateStart',
      headerName: 'Check-in',
      width: 150,
      editable: false,
      sortable: true,
    },
    {
      field: 'dateEnd',
      headerName: 'Check-out',
      width: 150,
      editable: false,
      sortable: false,
    },
    {
      field: 'nights',
      headerName: 'Nights',
      sortable: false,
      width: 100,
      editable: false,
    },
    {
      field: 'delete',
      headerName: 'Remove',
      sortable: false,
      width: 100,
      editable: false,
      renderCell: ({ id }) => {
        const handleDelete = (event) => {
          event.stopPropagation(); // don't select this row after clicking
          dispatch(removeSchedule(event.target.closest('button').dataset.scheduleid));
        };
        return (
          <>
            <IconButton edge="end" aria-label="delete" data-scheduleId={id}>
              <DeleteIcon onClick={handleDelete} />
            </IconButton>
          </>
        )
      }
    },
  ];

  const rows = scheduleInfo.map(item => {
    return {
      id: item.scheduleId,
      hotelName: item.hotelName,
      city: item.city,
      dateStart: getDateDDMMYYY(item.dateStart),
      dateEnd: getDateDDMMYYY(item.dateEnd),
      nights: item.nights,
      delete: item
    }
  });

  return (
    <>
      {!!scheduleInfo.length
        ? <Box sx={{ height: '600px', width: '1152px', display: 'flex' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={9}
            checkboxSelection={false}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
        : <Typography>You don't have reservation yet</Typography>
      }
    </>
  );
};

UserScheduleList.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserScheduleList;
