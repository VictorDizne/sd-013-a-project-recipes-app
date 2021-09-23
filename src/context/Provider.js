import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
// consulta ao site - https://pt-br.reactjs.org/docs/render-props.html

function Provider({ children }) {
  const [emailInput, setEmailInput] = useState('');

  return (
    // permite componentes consumidores a assinarem mudanças no contexto, no caso email e set email que serao salvos no estado
    <Context.Provider
      value={ {
        emailInput,
        setEmailInput,
      } }
    >
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
