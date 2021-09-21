import React, { useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './appcontext';

export default function Provider({ children }) {
  const [userEmail, changeUserEmail] = useState('');
  const [userPassword, changeUserPassword] = useState('');

  const contextValue = {
    userEmail,
    changeUserEmail,
    userPassword,
    changeUserPassword,
  };

  return (
    <appContext.Provider value={ contextValue }>
      {children}
    </appContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};
