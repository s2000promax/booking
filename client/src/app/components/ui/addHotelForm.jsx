import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/ validator';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import { useSelector, useDispatch } from 'react-redux';
import { getCitiesGE } from '../../store/citiesGE';
import { useParams } from 'react-router-dom';
import { addNewHotel } from '../../store/hotelsGE';
import { Box, Paper, Stack, Typography } from '@mui/material';
import TextAreaField from '../common/form/textAreaField';
import BackHistoryButton from '../common/backButton';

const AddHotelForm = () => {
  const params = useParams();
  const { userId } = params;
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: '',
    roomsNumber: '',
    rate: '',
    owner: '',
    location: '',
    description: '',
    price: '',
    image: ''
  });

  const citiesGeList = useSelector(getCitiesGE()).map((p) => ({
    label: p.name,
    value: p._id
  }));

  const roomsCountList = new Array(3).fill('').map((_, index) => ({
    label: index + 1,
    value: index
  }));
  const rateList = new Array(5).fill('').map((_, index) => ({
    label: index + 1,
    value: index
  }));
  const imgList = new Array(25).fill('').map((_, index) => ({
    label: index + 1,
    value: index + 1
  }));

  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const validatorConfig = {
    name: {
      isRequired: {
        message: 'Name is required'
      },
      min: {
        message: 'Name must have 3 symbols min',
        value: 3
      },
    },
    description: {
      isRequired: {
        message: 'Description is required'
      },
      min: {
        message: 'Description must have 10 symbols min',
        value: 10
      },
    },
    location: {
      isRequired: {
        message: 'Field is required'
      }
    },
    roomsNumber: {
      isRequired: {
        message: 'Field is required'
      }
    },
    rate: {
      isRequired: {
        message: 'Field is required'
      }
    },
    price: {
      isRequired: {
        message: 'Field is required'
      }
    },
    image: {
      isRequired: {
        message: 'Field is required'
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();

    if (!isValid) return;

    const newData = {
      ...data,
      owner: userId
    };
    dispatch(addNewHotel(newData));
  };

  return (
    <Stack width='100%' display='flex' direction='column' alignItems='center'>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            mt: '20px',
            width: '1100px',
            height: '610px',
          },
        }}
      >
        <Paper elevation={12} sx={{ width: '100%' }}>
          <Stack width='100%' height='100%' display='flex' direction='column' alignItems='center'
                 justifyContent='center'>
            <Typography variant='h6' sx={{ textTransform: 'uppercase', mb: '20px' }}>Add new object reservation</Typography>
            <form onSubmit={handleSubmit} style={{ width: '1000px' }}>

              <Stack
                direction='row'
                justifyContent='center'
                alignItems='stretch'
                spacing={6}
              >
                <Stack width='50%'>
                  <TextField
                    label='Name'
                    name='name'
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <TextAreaField
                    label='Description'
                    name='description'
                    value={data.description}
                    onChange={handleChange}
                    error={errors.description}
                  />
                  <SelectField
                    label='Location'
                    defaultOption='Choose...'
                    name='location'
                    options={citiesGeList}
                    onChange={handleChange}
                    value={data.location}
                    error={errors.location}
                  />
                </Stack>
                <Stack width='50%'>
                  <SelectField
                    label='Number of rooms'
                    defaultOption='Choose...'
                    name='roomsNumber'
                    options={roomsCountList}
                    onChange={handleChange}
                    value={data.roomsNumber}
                    error={errors.roomsNumber}
                  />
                  <TextField
                    label='Price'
                    name='price'
                    value={data.price}
                    onChange={handleChange}
                    error={errors.price}
                  />
                  <SelectField
                    label='Rate'
                    defaultOption='Choose...'
                    name='rate'
                    options={rateList}
                    onChange={handleChange}
                    value={data.rate}
                    error={errors.rate}
                  />
                  <SelectField
                    label='Image'
                    defaultOption='Choose...'
                    name='image'
                    options={imgList}
                    onChange={handleChange}
                    value={data.image}
                    error={errors.image}
                  />
                </Stack>
              </Stack>
              <Stack display='flex' direction='row' spacing='2' justifyContent='space-between'>
                <Stack width='120px'>
                  <BackHistoryButton />
                </Stack>
                <Stack width='120px'>
              <button
                type='submit'
                disabled={!isValid}
                className='btn btn-primary w-100 mx-auto'
              >
                Submit
              </button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Box>
    </Stack>
  );
};

export default AddHotelForm;
