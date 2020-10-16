import React from 'react';
import { shallow } from 'enzyme';

import PrivateRoute from './privateRoute';

const props = {
  component: jest.fn(),
  path: ''
};

describe('PrivateRoute [ Route: utility ] component:', () => {
  it('renders without crashing', () => {
    shallow(<PrivateRoute {...props} />);
  });
});
