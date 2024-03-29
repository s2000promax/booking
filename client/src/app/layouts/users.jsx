import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import EditUserPage from '../components/page/editUserPage';
import UserPage from '../components/page/userPage';

import { getCurrentUserId, getUserById } from '../store/users';
import Main from './main';

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    const currentUserId = useSelector(getCurrentUserId());
    const user = useSelector(getUserById(userId));

  return (
        <>
                {userId ? (
                    edit ? (
                        userId === currentUserId ? (
                            <EditUserPage />
                        ) : (
                            <Redirect to={`/users/${currentUserId}/edit`} />
                        )
                    ) : (
                        <UserPage user={user} />
                    )
                ) : (
                  <Main />
                )}
        </>
    );
};

export default Users;
