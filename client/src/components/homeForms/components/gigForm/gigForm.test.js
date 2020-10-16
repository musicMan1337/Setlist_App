import React from 'react';
import { shallow } from 'enzyme';

import DatabaseContextProvider from 'src/context/databaseContext';
import GigForm from './gigForm';

const userName = ''

describe('GigForm component:', () => {
  it('renders without crashing', () => {
    shallow(
      <DatabaseContextProvider userName={userName}>
        <GigForm />
      </DatabaseContextProvider>
    );
  });
});
