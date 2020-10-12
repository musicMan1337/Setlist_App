import React from 'react';

import './containers.scss';

export const MainContainer = ({ ...props }) => {
  return <main className="main-container" {...props} />
};

export const MobileContainer = ({ ...props }) => {
  return <div className="mobile-container" {...props} />
};

export const SongContainer = ({ ...props }) => {
  return <div className="song-container" {...props} />
};

export const SetGigContainer = ({ ...props }) => {
  return <div className="set-gig-container" {...props} />
};
