import React from 'react';
import { shallow } from 'enzyme';

import Header from './header';

const props = {
  userName: '',
  logout: jest.fn()
}

describe('Header component:', () => {
  it('renders without crashing', () => {
    shallow(<Header {...props} />);
  });
});
