import React, { useEffect } from 'react';
import ScheduleForm from '../components/ui/scheduleForm';
import Footer from '../components/common/footer';
import { loadScheduleList } from '../store/schedule';
import { useDispatch } from 'react-redux';

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadScheduleList());
  }, []);

  return (
    <>
      <ScheduleForm/>
      <Footer />
    </>
  );
};

export default Main;
