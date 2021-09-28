import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context/Context';

const Provider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  function clickLoading() {
    setLoading(!loading);
    console.log(!loading);
  }

  // Aqui no objeto context vc passsa o que quer acessar em outra pagina,
  // no meu caso eu "loading, setLoading e clickLoading" e setData como test mas podendo ser uma função ou outra coisa
  //  que julgue necessario.
  const context = {
    clickLoading,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
