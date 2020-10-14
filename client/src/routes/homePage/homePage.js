import React from 'react';

import './homePage.scss'

import { HomeForms } from 'src/components';

const HomePage = () => {
  return (
    <div className="home-page-container">
      <h1>Create some stuff!</h1>
      <HomeForms />
    </div>
  );
};

export default HomePage;
