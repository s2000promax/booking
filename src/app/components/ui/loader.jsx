import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ type }) => {
  switch (type) {
    case '1':
      return (
        <div className='d-flex min-vh-100 min-vw-100'>
          <div className='d-flex m-lg-auto align-items-center'>
            <strong>Загрузка... </strong>
            <div className='spinner-border ms-auto' role='status' aria-hidden='true'></div>
          </div>
        </div>
      );
    case '2':
      return (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    default:
      return (
        <div>Loading...</div>
      );
  }
};

Loader.propTypes = {
  type: PropTypes.string
};

export default Loader;
