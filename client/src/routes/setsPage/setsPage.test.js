import React from 'react';
import { shallow } from 'enzyme';

import SetsPage from './setsPage';

describe('SetsPage [ Route ] component:', () => {
  it('renders without crashing', () => {
    shallow(<SetsPage />);
  });
});
