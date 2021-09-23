import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

export default function Bebidas({ history }) {
  const { drinks } = useContext(RecipesContext);

  useEffect(() => {
    if (!drinks) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (drinks.length === 1) history.push(`/bebidas/${drinks[0].idDrink}`);
  }, [drinks, history]);

  return (
    <Header pageTitle="Bebidas" history={ history } isMeal={ false } />
  );
}

Bebidas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
