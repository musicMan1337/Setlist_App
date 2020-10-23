import React from 'react';
import { shallow } from 'enzyme';

import DatabaseContextProvider from 'src/context/databaseContext';
import SetForm from './setForm';

const userName = ''

describe('SetForm component:', () => {
  it('renders without crashing', () => {
    shallow(
      <DatabaseContextProvider userName={userName}>
        <SetForm />
      </DatabaseContextProvider>
    );
  });
});
