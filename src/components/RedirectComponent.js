import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

const RedirectComponent = ({ fetchResult }) => {
  if (fetchResult) {
    if (fetchResult.drinks && fetchResult.drinks.length === 1) {
      return <Redirect to={ `bebidas/${fetchResult.drinks[0].idDrink}` } />;
    }

    if (fetchResult.meals && fetchResult.meals.length === 1) {
      return <Redirect to={ `comidas/${fetchResult.meals[0].idMeal}` } />;
    }
    if (fetchResult.drinks === null || fetchResult.meals === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }
  return null;
};

RedirectComponent.propTypes = {
  fetchResult: PropTypes.objectOf().isRequired,
};

export default RedirectComponent;
