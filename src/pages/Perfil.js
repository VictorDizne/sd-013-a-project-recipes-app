import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

export default function Perfil({ history }) {
  return (
    <Header pageTitle="Perfil" history={ history } />
  );
}

Perfil.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
