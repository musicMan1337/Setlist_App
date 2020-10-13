import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import './mobileView.scss'

import { DatabaseContext } from 'src/context/databaseContext';
import { SONGS, SETS, GIGS } from 'src/constants/routes.constants';

import MobileCard from './components/mobileCard/mobileCard';

const MobileView = ({ page }) => {
  const { songs, sets } = useContext(DatabaseContext);

  let renderCards;
  switch (page) {
    case SONGS:
      renderCards = songs.map((song) => (
        <MobileCard
          key={song.song_title}
          title={song.song_title}
          description={song.description}
          isSong
          composer={song.composer}
          arranger={song.arranger}
        />
      ));
      break;

    case SETS:
      renderCards = sets.map((set) => (
        <MobileCard
          key={set.set_name}
          title={set.set_name}
          description={set.description}
          isSet
          songTitles={set.songs}
        />
      ));
      break;

    // TODO - Feature: Gigs
    // case GIGS:
    //   renderCards = gigs.map((gig) => (
    //     <MobileCard
    //       key={gig.gig_name}
    //       title={gig.gig_name}
    //       description={gig.description}
    //     />
    //   ));
    //   break;

    default:
      // TODO - Component: PageNotFound
      // renderCards = <PageNotFound />
      break;
  }

  return (
    <div className="mobile-container">
      <ul className="mobile-list">{renderCards}</ul>
    </div>
  );
};

export default MobileView;

MobileView.propTypes = {
  page: PropTypes.oneOf([SONGS, SETS, GIGS]).isRequired
};
