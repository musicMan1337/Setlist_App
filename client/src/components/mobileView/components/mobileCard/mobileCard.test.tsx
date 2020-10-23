import React from 'react';
import { shallow } from 'enzyme';

import MobileCard from './mobileCard';

const props = {
  id: 1,
  title: '',
  description: '',
  handleUserUpdate: jest.fn()
};

describe('MobileCard component:', () => {
  it('renders without crashing', () => {
    shallow(<MobileCard {...props} />);
  });
});
