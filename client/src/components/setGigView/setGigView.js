import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import './setGigView.scss'

import { DatabaseContext } from 'src/context/databaseContext';
import { SETS, GIGS } from 'src/constants/routes.constants';

import { SGList, SGBoards } from './components';

const SetGigView = ({ page }) => {
  // TODO - useState "expanded-card" toggle

  const { songs, sets, handleUserUpdate } = useContext(DatabaseContext);

  let context;
  switch (page) {
    case SETS:
      context = {
        listTable: songs,
        boardTable: sets,
        buttonText: 'Add to Set',
        handleUserUpdate
      };
      break;

    // TODO - Feature: Gigs
    // case GIGS:
    //   context = { listTable: sets, boardTable: gigs, buttonText: 'Add to Gig', handleUserUpdate };
    //   break;

    default:
      break;
  }

  return (
    <div className="set-gig-container">
      <SGList {...context} />
      <SGBoards {...context} />
    </div>
  );
};

export default SetGigView;

SetGigView.propTypes = {
  page: PropTypes.oneOf([SETS, GIGS]).isRequired
};
