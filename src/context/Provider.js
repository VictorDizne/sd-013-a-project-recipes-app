import PropTypes from 'prop-types';
import React, { createContext } from 'react';

// export const MainContext = createContext();
// export const SecondContext = createContext();

export function Provider({ children }) {
  const contextValue = {
  };
  return (
    <MainContext.Provider value={ contextValue }>
      {children}
    </MainContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
