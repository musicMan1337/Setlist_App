import React from 'react';
import { shallow } from 'enzyme';

import HomeForms from './homeForms';

describe('HomeForms component:', () => {
  it('renders without crashing', () => {
    shallow(<HomeForms />);
  });
});
