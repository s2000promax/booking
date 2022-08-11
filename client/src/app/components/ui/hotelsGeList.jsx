import React from 'react';
import { useSelector } from 'react-redux';
import { getHotelssGE } from '../../store/hotelsGE';

const HotelsGeList = () => {
const hotelsGE = useSelector(getHotelssGE());
  console.log(hotelsGE);
  return (
    <>
      <h5>Hotels List</h5>
    </>
  );
};

export default HotelsGeList;
