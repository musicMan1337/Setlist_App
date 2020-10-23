import React from 'react';
import { shallow } from 'enzyme';

import PublicRoute from './publicRoute';

const props = {
  component: jest.fn(),
  loginSuccess: jest.fn(),
  path: ''
};

describe('PublicRoute [ Route: utility ] component:', () => {
  it('renders without crashing', () => {
    shallow(<PublicRoute {...props} />);
  });
});
