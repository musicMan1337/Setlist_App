import React from 'react';
import PropTypes from 'prop-types';

import './utils.scss';

export const Button = ({ className, type, ...props }) => {
  /* eslint-disable react/button-has-type */
  // niche bug with eslint dynamic types
  return (
    <button
      className={['button', className].join(' ')}
      type={type}
      {...props}
    />
  );
};

export const MainContainer = () => {
  return <main className="main-container" />
};

Button.defaultProps = { className: '', type: 'button' };
Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit'])
};
