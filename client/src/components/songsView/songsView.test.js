import React from 'react';
import { shallow } from 'enzyme';

import DatabaseContextProvider from 'src/context/databaseContext';
import SongsView from './songsView';

const userName = '';

describe('SongsView component:', () => {
  it('renders without crashing', () => {
    shallow(
      <DatabaseContextProvider userName={userName}>
        <SongsView />
      </DatabaseContextProvider>
    );
  });
});
