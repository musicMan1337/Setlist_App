import React from 'react';
import { shallow } from 'enzyme';

import GigsPage from './gigsPage';

describe('GigsPage [ Route ] component:', () => {
  it('renders without crashing', () => {
    shallow(<GigsPage />);
  });
});
