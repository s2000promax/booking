import React, { useEffect } from 'react';
import ScheduleForm from '../components/ui/scheduleForm';
import { loadScheduleList } from '../store/schedule';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '../components/common/slider';
import { getFirstSearchStatus } from '../store/searchRequest';

const Main = () => {
  const dispatch = useDispatch();
  const isFirstSearched = useSelector(getFirstSearchStatus());


  useEffect(() => {
    dispatch(loadScheduleList());
  }, []);

  return (
    <>
      <ScheduleForm/>
      {!isFirstSearched
        && <Slider/>
      }
    </>
  );
};

export default Main;
