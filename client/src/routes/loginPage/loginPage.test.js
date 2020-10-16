import React from 'react';
import { shallow } from 'enzyme';

import LoginPage from './loginPage';

const loginSuccess = jest.fn()

describe('LoginPage [ Route ] component:', () => {
  it('renders without crashing', () => {
    shallow(<LoginPage loginSuccess={loginSuccess} />);
  });
});
