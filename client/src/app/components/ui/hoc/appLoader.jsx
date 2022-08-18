import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUsersList
} from '../../../store/users';

import { loadCitiesGeList } from '../../../store/citiesGE';
import { loadHotelsGeList } from '../../../store/hotelsGE';
import Loader from '../../common/loader';

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(getIsLoggedIn());
  const usersStatusLoading = useSelector(getUsersLoadingStatus());

  useEffect(() => {
    dispatch(loadCitiesGeList());
    dispatch(loadHotelsGeList());
    if (isLoggedIn) {
      dispatch(loadUsersList());
    }
  }, [isLoggedIn]);

  if (usersStatusLoading) return <Loader type={'1'}/>;
  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AppLoader;
