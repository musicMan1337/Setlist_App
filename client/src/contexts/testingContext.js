import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TestingContext = React.createContext([{}, () => {}]);

const TestingContextProvider = (props) => {
  const [state, setState] = useState({});

  return (
    <TestingContext.Provider value={[state, setState]}>
      {props.children}
    </TestingContext.Provider>
  );
};

export { TestingContext, TestingContextProvider };

TestingContextProvider.propTypes = {
  children: PropTypes.element.isRequired
};
