import React, { useState } from 'react';
import PropTypes from 'prop-types';
import recipeContext from './index';

function Provider({ children }) {
  const [showInput, setShowInput] = useState(false);
  function handleShowInput() {
    setShowInput(!showInput);
  }
  const ContextLogin = {};
  const ContextHeader = { handleShowInput };
  const ContextComidas = { showInput };
  const ContextBebidas = { showInput };
  const ContextFooter = {};
  const context = {
    ContextLogin,
    ContextComidas,
    ContextBebidas,
    ContextHeader,
    ContextFooter,
  };
  return (
    <recipeContext.Provider value={ context }>
      { children }
    </recipeContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
};

export default Provider;