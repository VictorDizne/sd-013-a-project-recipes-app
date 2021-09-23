import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

export default function Comidas({ history }) {
  const { meals } = useContext(RecipesContext);

  useEffect(() => {
    if (!meals) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (meals.length === 1) history.push(`/comidas/${meals[0].idMeal}`);
  }, [meals, history]);

  return (
    <Header pageTitle="Comidas" history={ history } isMeal />
  );
}

Comidas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
