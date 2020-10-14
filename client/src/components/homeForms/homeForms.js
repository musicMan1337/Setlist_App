import React from 'react';

import './homeForms.scss';

import { SongForm, SetForm } from './components';

const HomeForms = () => {
  return (
    <div className="temp-style-until-gigs-implementation" style={{ alignItems: "flex-start" }}>
      <SongForm />
      <SetForm />
    </div>
  );
};

export default HomeForms;
