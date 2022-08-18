import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/users';
import Loader from '../components/common/loader';
import { searchClear } from '../store/searchRequest';

const LogOut = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchClear())
        dispatch(logOut());
    }, []);

    return <Loader type={'1'} /> ;
};

export default LogOut;
