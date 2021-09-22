import React, { useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './appContext';

const AppProvider = ({ children }) => {
  const [state, setState] = useState({ foods: [] });

  return (
    <appContext.Provider value={ { state, setState } }>
      {children}
    </appContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
