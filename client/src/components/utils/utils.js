import React from 'react';
import PropTypes from 'prop-types';

import './utils.scss';

export const Button = ({ className, type, ...props }) => {
  Button.defaultProps = { className: '', type: 'button' };

  /* eslint-disable react/button-has-type */
  // niche bug with eslint
  return (
    <button
      className={['button', className].join(' ')}
      type={type}
      {...props}
    />
  );
};

export const three = () => {
  return 3;
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string
};
