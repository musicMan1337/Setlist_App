import React from 'react';

// import { GIGS } from 'src/constants/routes.constants';

// import { MobileView, SetGigView } from 'src/components';

import { PageNotFound } from 'src/routes/utils';

const GigsPage = () => {
  // TODO - Feature: useState "expanded-card" (mobile) toggle

  return (
    <>
      {/* <MobileView page={GIGS} />
      <SetGigView page={GIGS} /> */}
      <PageNotFound />
    </>
  );
};

export default GigsPage;
