import React from 'react';
import { shallow } from 'enzyme';

import { SONGS } from 'src/constants/routes.constants';

import DatabaseContextProvider from 'src/context/databaseContext';
import MobileView from './mobileView';

const userName = '';

describe('MobileView component:', () => {
  it('renders without crashing', () => {
    shallow(
      <DatabaseContextProvider userName={userName}>
        <MobileView page={SONGS} />
      </DatabaseContextProvider>
    );
  });
});
