import React from 'react';
import { shallow } from 'enzyme';

import PageNotFound from './pageNotFound';

describe('PageNotFound [ Route: utility ] component:', () => {
  it('renders without crashing', () => {
    shallow(<PageNotFound />);
  });
});
