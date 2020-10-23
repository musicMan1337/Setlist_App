import React, { FC, MouseEventHandler } from 'react';

import './utils.scss';

type ButtonProps = {
  type?: 'button' | 'submit';
  className?: string;
  value?: string;
  onClick?: MouseEventHandler;
  onChange?: MouseEventHandler;
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
  type = 'button',
  className,
  value,
  onClick,
  onChange,
  disabled,
  ...children
}) => {
  return (
    <button
      type={type}
      className={['button', className].join(' ')}
      {...children}
    />
  );
};

export const CardHr = () => {
  return <hr className="card-hr" />;
};
