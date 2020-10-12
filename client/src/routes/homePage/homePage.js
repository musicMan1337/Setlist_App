import React from 'react';

import { HomeCard } from 'src/components';
import { SONGS, SETS, GIGS } from 'src/constants/routes.constants';

const HomePage = () => {
  const renderCards = () =>
    [SONGS, SETS, GIGS].map(([route, title]) => (
      <HomeCard key={title} route={route} title={title} />
    ));

  return <>{renderCards()}</>;
};

export default HomePage;
