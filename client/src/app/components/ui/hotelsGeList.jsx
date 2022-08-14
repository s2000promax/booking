import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHotelsGE } from '../../store/hotelsGE';
import { createSchedule } from '../../store/schedule';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getCurrentUserId } from '../../store/users';
import { getSearchStatus } from '../../store/searchRequest';

const HotelsGeList = () => {
  const dispatch = useDispatch();

  const currentUserId = useSelector(getCurrentUserId());

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [hotelId, setHotelId] = useState(null);

  const hotelsGE = useSelector(getHotelsGE());
  console.log(hotelsGE, startDate, endDate);

  const handlerClick = (event) => {
    const value = event.target;
    setHotelId(value.dataset.id)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createSchedule({
      userId: currentUserId,
      hotelId,
      rooms: 1,
      dateStart: startDate,
      dateEnd: endDate
    }));
  }

  return (
    <>
      <div>
        current user:{currentUserId}
        <p>-----</p>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'end'
      }}>
        <div>
          <h5>Date start</h5>
          <Calendar onChange={setStartDate} value={startDate} />
          <span>{startDate.toDateString()}</span>
        </div>
        <div>
          <h5>Date end</h5>
          <Calendar onChange={setEndDate} value={endDate} />
          <span>{endDate.toDateString()}</span>
        </div>
      </div>
      <h5>Choosed: {!!hotelId ? hotelId: 'no choose'}</h5>
      <h5>Hotels List</h5>

      {!!hotelsGE?.length &&
        <ul>
          {hotelsGE.map((h) => (
            <li key={h._id}>
              <div>
                <p onClick={handlerClick} data-id={h._id}>{h.name}</p>
                <p>Rooms {h.roomsNumber}</p>
                <p>Rate {h.rate}</p>
              </div>
            </li>
          ))}
        </ul>
      }
    </>
  );
};

export default HotelsGeList;
