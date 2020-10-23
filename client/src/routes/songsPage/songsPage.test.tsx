import React from 'react';
import { shallow } from 'enzyme';

import SongsPage from './songsPage';

describe('SongsPage [ Route ] component:', () => {
  it('renders without crashing', () => {
    shallow(<SongsPage />);
  });
});
