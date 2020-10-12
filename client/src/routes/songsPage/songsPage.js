import React from 'react';

import { SONGS } from 'src/constants/routes.constants';

import { MobileView, SongsView } from 'src/components';

const SongsPage = () => {
  // TODO - Feature: useState "expanded-card" (mobile) toggle

  return (
    <>
      <MobileView page={SONGS} />
      <SongsView />
    </>
  );
};

export default SongsPage;
