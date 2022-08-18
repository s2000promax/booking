import React, { useEffect, useState } from 'react';
import { validator } from '../../../utils/ validator';
import TextField from '../../common/form/textField';
import BackHistoryButton from '../../common/backButton';
import { useSelector, useDispatch } from 'react-redux';

import { getCurrentUserData, updateUser } from '../../../store/users';
import Loader from '../../common/loader';
import { Box, Paper, Stack, Typography } from '@mui/material';

const EditUserPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useSelector(getCurrentUserData());
  const [data, setData] = useState({
    name: currentUser.name,
    email: currentUser.email
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(
      updateUser({
        ...data,
      })
    );
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Email is required'
      },
      isEmail: {
        message: 'Email incorrect'
      }
    },
    name: {
      isRequired: {
        message: 'Name is required'
      }
    }
  };

  useEffect(() => validate(), [data]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <>
      <Stack width='100%' display='flex' direction='column' alignItems='center'>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              mt: '20px',
              width: '500px',
              height: '350px',
            },
          }}
        >
          <Paper elevation={12} sx={{ width: '100%' }}>
            <Stack width='100%' height='100%' display='flex' direction='column' alignItems='center'
                   justifyContent='center'>
              <Typography variant='h6' sx={{ textTransform: 'uppercase', mb: '20px' }}>Update user information</Typography>
              {!isLoading ? (
                <form onSubmit={handleSubmit}>
                  <TextField
                    label='Name'
                    name='name'
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <TextField
                    label='Email'
                    name='email'
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
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
                        Update
                      </button>
                    </Stack>
                  </Stack>
                </form>
              ) : (
                <>
                  <Loader type={'1'}/>
                </>
              )}
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </>
  );
};

export default EditUserPage;
