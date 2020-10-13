import React from 'react';

import { SETS } from 'src/constants/routes.constants';

import { MobileView, SetGigView } from 'src/components';

const SetsPage = () => {
  // TODO - Feature: useState "expanded-card" (mobile) toggle

  return (
    <>
      <MobileView page={SETS} />
      <SetGigView page={SETS} />
    </>
  );
};

export default SetsPage;
