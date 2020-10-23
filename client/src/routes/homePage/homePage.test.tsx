import React from 'react';
import { shallow } from 'enzyme';

import HomePage from './homePage';

describe('HomePage [ Route ] component:', () => {
  it('renders without crashing', () => {
    shallow(<HomePage />);
  });
});
