import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/ validator';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radio.Field';
import { useSelector, useDispatch } from 'react-redux';
import { getUserById, signUp } from '../../store/users';
import { getCitiesGE } from '../../store/citiesGE';
import PropTypes from 'prop-types';
import UserPage from '../page/userPage';
import { useHistory } from 'react-router-dom';
import { addNewHotel } from '../../store/hotelsGE';

const AddHotelForm = ({ userId }) => {
    const history = useHistory();
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

    const roomsCountList = new Array(3).fill().map((_, index) => ({
        label: index + 1,
        value: index
    }));
    const rateList = new Array(5).fill().map((_, index) => ({
        label: index + 1,
        value: index
    }));
    const imgList = new Array(25).fill().map((_, index) => ({
        label: index + 1,
        value: index + 1
    }));

    const [errors, setErrors] = useState({});
    console.log(data)
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
        console.log('Dispatch', newData)
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label='Name'
                name='name'
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
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
            <button
                type='submit'
                disabled={!isValid}
                className='btn btn-primary w-100 mx-auto'
            >
                Submit
            </button>
        </form>
    );
};

export default AddHotelForm;
