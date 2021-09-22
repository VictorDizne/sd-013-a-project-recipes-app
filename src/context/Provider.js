import React from 'react';
import PropTypes from 'prop-types';
import recipeContext from './index';

function Provider({ children }) {
  const ContextLogin = {};
  const ContextHeader = {};
  const ContextComidas = {};
  const ContextBebidas = {};
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
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
}.isRequired;

export default Provider;
