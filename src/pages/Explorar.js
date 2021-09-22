import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

export default function Explorar({ history }) {
  return (
    <Header pageTitle="Explorar" history={ history } />
  );
}

Explorar.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
