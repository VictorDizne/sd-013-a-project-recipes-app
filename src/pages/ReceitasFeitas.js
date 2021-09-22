import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

export default function ReceitasFeitas({ history }) {
  return (
    <Header pageTitle="Receitas Feitas" history={ history } />
  );
}

ReceitasFeitas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
