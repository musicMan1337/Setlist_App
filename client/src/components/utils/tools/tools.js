import React from 'react';
import PropTypes from 'prop-types';

import './tools.scss';

export const CardHr = () => {
  return <hr className="card-hr" />
};

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

Button.defaultProps = { className: '', type: 'button' };

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit'])
};
