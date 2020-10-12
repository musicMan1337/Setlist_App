import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { DatabaseContext } from 'src/context/databaseContext';
import { SETS, GIGS } from 'src/constants/routes.constants';

import { SetGigContainer } from 'src/components/utils/containers';
import { SGList, SGBoards } from './components';

const SetGigView = ({ page }) => {
  // TODO - Component "set-gig-card"
  // TODO - Component "set-gig-board"
  // TODO - Component "choose-set"
  // TODO - Component "set-gig-boards"

  // TODO - map() render "set-gig-card"
  // TODO - map() render "choose-set"
  // TODO - map() render "set-gig-board"

  // TODO - useState "expanded-card" toggle
  // TODO - useState "choose-set" toggle

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
      context = {
        listTable: songs,
        boardTable: sets,
        buttonText: 'Add to Set',
        handleUserUpdate
      };
      break;
  }

  return (
    <SetGigContainer>
      <SGList {...context} />
      <SGBoards {...context} />
    </SetGigContainer>
  );
};

export default SetGigView;

SetGigView.propTypes = {
  page: PropTypes.oneOf([SETS, GIGS]).isRequired
};
