import React from 'react';
import { shallow } from 'enzyme';

import { CardHr, Button } from './utils';

describe('CardHr (util) component:', () => {
  it('renders without crashing', () => {
    shallow(<CardHr />);
  });
});

describe('Button (util) component:', () => {
  it('renders without crashing', () => {
    shallow(<Button />);
  });
});
