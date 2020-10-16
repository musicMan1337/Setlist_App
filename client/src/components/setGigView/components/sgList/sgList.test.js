import React from 'react';
import { shallow } from 'enzyme';

import SGList from './sgList';

const props = {
  listTable: [],
  boardTable: [],
  buttonText: 'Add to Set',
  handleUserUpdate: jest.fn()
};

describe('SGList component:', () => {
  it('renders without crashing', () => {
    shallow(<SGList {...props} />);
  });
});
