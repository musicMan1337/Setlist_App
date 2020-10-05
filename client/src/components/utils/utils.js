import React from 'react';
import PropTypes from 'prop-types';
import './utils.scss';

export const Button = ({ className = '', type = 'button', ...props }) => {
  // eslint-disable-next-line react/button-has-type
  return <button className={['button', className].join(' ')} type={type} {...props} />;
};

export const three = () => {
  return 3;
};

Button.propTypes = {
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
