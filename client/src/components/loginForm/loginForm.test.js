import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from './loginForm';

const loginSuccess = jest.fn()

describe('LoginForm component:', () => {
  it('renders without crashing', () => {
    shallow(<LoginForm loginSuccess={loginSuccess} />);
  });
});
