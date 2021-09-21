import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';

const HomeFood = () => (
  <div>
    <Header name="Comidas" search />
    Home Food
  </div>
);

HomeFood.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default HomeFood;
