import React, { useContext } from 'react';

import './mobileView.scss';

import { DatabaseContext } from 'src/context/databaseContext';
import { SONGS, SETS, GIGS } from 'src/constants/routes.constants';

import { PageNotFound } from 'src/routes/utils';
import MobileCard from './components/mobileCard/mobileCard';

type MobileViewProps = {
  page: typeof SONGS | typeof SETS | typeof GIGS;
};

const MobileView = ({ page }: MobileViewProps) => {
  const { songs, sets, handleUserUpdate } = useContext(DatabaseContext);

  let renderCards;
  switch (page) {
    case SONGS:
      renderCards = songs.map((song) => (
        <MobileCard
          key={song.id}
          id={song.id}
          title={song.song_title}
          description={song.description}
          handleUserUpdate={handleUserUpdate}
          isSong
          composer={song.composer}
          arranger={song.arranger}
        />
      ));
      break;

    case SETS:
      renderCards = sets.map((set) => (
        <MobileCard
          key={set.id}
          id={set.id}
          title={set.set_name}
          description={set.description}
          handleUserUpdate={handleUserUpdate}
          isSet
          songs={set.songs}
          allSongs={songs}
        />
      ));
      break;

    // TODO - Feature: Gigs
    // case GIGS:
    //   renderCards = gigs.map((gig) => (
    //     <MobileCard
    //       key={gig.id}
    //       handleUserUpdate={handleUserUpdate}
    //     />
    //   ));
    //   break;

    default:
      renderCards = <PageNotFound />;
      break;
  }

  return (
    <div className="mobile-container">
      <ul className="mobile-list">{renderCards}</ul>
    </div>
  );
};

export default MobileView;
