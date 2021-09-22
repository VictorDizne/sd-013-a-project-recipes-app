import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

export default function ReceitasFavoritas({ history }) {
  return (
    <Header pageTitle="Receitas Favoritas" history={ history } />
  );
}

ReceitasFavoritas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
