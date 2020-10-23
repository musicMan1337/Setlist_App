import React from 'react';
import { shallow } from 'enzyme';

import SGBoards from './sgBoards';

const props = {
  boardTable: [],
  buttonText: 'Add to Set',
  handleUserUpdate: jest.fn()
};

describe('SGBoards component:', () => {
  it('renders without crashing', () => {
    shallow(<SGBoards {...props} />);
  });
});
