import React from 'react';

import './lists.scss';

export const MobileList = ({...props}) => {
  return <ul className="song-set-gig-mobile-list" {...props} />
};

export const SetGigList = ({...props}) => {
  return <ul className="set-gig-list" {...props} />
};

export const Board = ({...props}) => {
  return <ul className="board" {...props} />
};
