import React from 'react';
import { shallow } from 'enzyme';

import DatabaseContextProvider from 'src/context/databaseContext';
import SongForm from './songForm';

const userName = ''

describe('SongForm component:', () => {
  it('renders without crashing', () => {
    shallow(
      <DatabaseContextProvider userName={userName}>
        <SongForm />
      </DatabaseContextProvider>
    );
  });
});
