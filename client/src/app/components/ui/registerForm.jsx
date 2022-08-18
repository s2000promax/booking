import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/ validator';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radio.Field';
import { useSelector, useDispatch } from 'react-redux';
import { signUp } from '../../store/users';
import { getCitiesGE } from '../../store/citiesGE';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: '',
        name: '',
        password: '',
        location: '',
        type: 'client',
    });

    const citiesGeList = useSelector(getCitiesGE()).map((p) => ({
        label: p.name,
        value: p._id
    }));

    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Email is required'
            },
            isEmail: {
                message: 'Email is incorrect'
            }
        },
        name: {
            isRequired: {
                message: 'Name is required'
            },
            min: {
                message: 'Name must have 3 symbols min',
                value: 3
            }
        },
        password: {
            isRequired: {
                message: 'Password is required'
            },
            isCapitalSymbol: {
                message: 'Password must have one capital letter'
            },
            isContainDigit: {
                message: 'Password must have one digit'
            },
            min: {
                message: 'Password must have length eighth or more',
                value: 8
            }
        },
        location: {
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
        };
        dispatch(signUp(newData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label='Email'
                name='email'
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label='Name'
                name='name'
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label='Password'
                type='password'
                name='password'
                value={data.password}
                onChange={handleChange}
                error={errors.password}
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
            <RadioField
                options={[
                    { name: 'Client', value: 'client' },
                    { name: 'Business', value: 'business' },
                ]}
                value={data.type}
                name='type'
                onChange={handleChange}
                label='Choose type of account'
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

export default RegisterForm;
