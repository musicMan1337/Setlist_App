import React, { FC } from 'react';

import './utils.scss';

export const Button: FC<Types.ButtonProps> = ({
  type = 'button',
  className,
  value,
  onClick,
  onChange,
  disabled,
  ...children
}) => (
  <button
    type={type}
    className={['button', className].join(' ')}
    value={value}
    onClick={onClick}
    onChange={onChange}
    disabled={disabled}
    {...children}
  />
);

export const CardHr = () => {
  return <hr className="card-hr" />;
};
