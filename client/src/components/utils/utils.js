import React from 'react';
import PropTypes from 'prop-types';

import './utils.scss'

export const CardHr = () => {
  return <hr className="card-hr" />
};

/* eslint-disable react/button-has-type */
// niche bug with eslint dynamic types
export const Button = ({ className, type, value, ...props }) => {
  return (
    <button
      className={['button', className].join(' ')}
      type={type}
      value={value}
      {...props}
    />
  );
};

Button.defaultProps = { className: '', type: 'button', value: '' };

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit']),
  value: PropTypes.string
};
