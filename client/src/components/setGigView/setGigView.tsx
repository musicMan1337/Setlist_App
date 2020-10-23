import React, { useContext } from 'react';

import './setGigView.scss';

import {
  DatabaseContext,
  SGComponentsProps
} from 'src/context/databaseContext';
import { SETS, GIGS } from 'src/constants/routes.constants';

import { SGList, SGBoards } from './components';

type SetGigViewProps = {
  page: typeof SETS | typeof GIGS;
};

const SetGigView = ({ page }: SetGigViewProps) => {
  // TODO - useState "expanded-card" toggle

  const { songs, sets, handleUserUpdate } = useContext(DatabaseContext);

  let context: SGComponentsProps = {
    buttonText: 'Add to Set',
    handleUserUpdate
  };
  switch (page) {
    case SETS:
      context = {
        ...context,
        songsList: songs,
        setsBoard: sets
      };
      break;

    // TODO - Feature: Gigs
    // case GIGS:
    //   context = { ...context, setsList: sets, gigsBoard: gigs, buttonText: 'Add to Gig' };
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
