import PropTypes from 'prop-types';
import React from 'react';
import MyContext from './myContext';

const Provider = ({ children }) => {
  const contextValue = {
    // data,
  };
  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
