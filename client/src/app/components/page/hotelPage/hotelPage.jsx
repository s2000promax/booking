import React from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { getHotelsGeById } from '../../../store/hotelsGE';
import { useParams } from 'react-router-dom';

const HotelPage = () => {
    const params = useParams();
    const currentHotel = useSelector(getHotelsGeById(params.hotelId));
    console.log('Hi', currentHotel)

    if (false) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        {}
                    </div>
                    <div className="col-md-8">
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

export default HotelPage;
