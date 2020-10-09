import React from 'react';

import {HomeCard} from 'src/components';
import { MainContainer } from 'src/components/utils/containers';
import { SONGS, SETS, GIGS } from 'src/constants/routes.constants';

const HomePage = () => {
  const renderCards = () =>
    [SONGS, SETS, GIGS].map(([route, title]) => (
      <HomeCard key={title} route={route} title={title} />
    ));

  return <MainContainer>{renderCards()}</MainContainer>;
};

export default HomePage;
