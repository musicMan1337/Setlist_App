import React from 'react';
import { shallow } from 'enzyme';

import { SETS } from 'src/constants/routes.constants';

import DatabaseContextProvider from 'src/context/databaseContext';
import SetGigView from './setGigView';

const userName = '';

describe('SetGigView component:', () => {
  it('renders without crashing', () => {
    shallow(
      <DatabaseContextProvider userName={userName}>
        <SetGigView page={SETS} />
      </DatabaseContextProvider>
    );
  });
});
