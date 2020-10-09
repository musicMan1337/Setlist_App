import React from 'react';

import './containers.scss';

export const MainContainer = ({ ...props }) => {
  return <main className="main-container" {...props} />
};

export const SongSetGigMobileContainer = ({ ...props }) => {
  return <div className="song-set-gig-mobile-container" {...props} />
};

export const SongContainer = ({ ...props }) => {
  return <div className="song-container" {...props} />
};

export const SetGigContainer = ({ ...props }) => {
  return <div className="set-gig-container" {...props} />
};

export const SetGigBoardsContainer = ({ ...props }) => {
  return <div className="set-gig-boards-container" {...props} />
};

export const SetGigBoards = ({ ...props }) => {
  return <div className="set-gig-boards" {...props} />
};
