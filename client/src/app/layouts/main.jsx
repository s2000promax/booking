import React, { useEffect } from 'react';
import ScheduleForm from '../components/ui/scheduleForm';
import { loadScheduleList } from '../store/schedule';
import { useDispatch } from 'react-redux';
import Slider from '../components/common/slider';

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadScheduleList());
  }, []);

  return (
    <>
      <ScheduleForm/>
      <Slider />
    </>
  );
};

export default Main;
