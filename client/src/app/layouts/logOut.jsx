import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/users';
import Loader from '../components/common/loader';

const LogOut = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logOut());
    }, []);

    return <Loader type={'1'} /> ;
};

export default LogOut;
