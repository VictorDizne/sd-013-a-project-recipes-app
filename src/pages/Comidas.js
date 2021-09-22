import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

export default function Comidas({ history }) {
  return (
    <Header pageTitle="Comidas" history={ history } />
  );
}

Comidas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
