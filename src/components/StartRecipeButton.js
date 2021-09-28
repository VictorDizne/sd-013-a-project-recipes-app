import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

const StartRecipeButton = ({ id, mealOrDrink, bebidasORcomidas }) => {
  const history = useHistory();
  const INICIAR_RECEITA = 'Iniciar Receita';
  const CONTINUAR_RECEITA = 'Continuar Receita';
  const [startedRecipe, setStartedRecipe] = useState(INICIAR_RECEITA);
  function checkJson() {
    const localstora = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (localstora) {
      console.log(localstora);
      setStartedRecipe(CONTINUAR_RECEITA);
    }
  }
  useEffect(() => {
    checkJson();
  }, []);

  function handleStartClick() {
    history.push(`/${bebidasORcomidas}/${id}/in-progress`);
    const bool = (mealOrDrink === 'cocktails' || mealOrDrink === 'meals');
    if (startedRecipe === INICIAR_RECEITA) {
      const salvo = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (salvo !== undefined && bool) {
        JSON.stringify(localStorage.setItem('inProgressRecipes',
          JSON.stringify({ [mealOrDrink]: { [id]: [] } })));
        console.log(localStorage.getItem('inProgressRecipes'), 'dentro do segundo if');
      }
    }
    return setStartedRecipe(CONTINUAR_RECEITA);
  }
  return (
    <button
      type="button"
      // value={ startedRecipe }
      onClick={ () => handleStartClick() }
      data-testid="start-recipe-btn"
      className="start-recipe-btn"
    >
      {startedRecipe}
    </button>
  );
};

StartRecipeButton.propTypes = {
  id: PropTypes.number,
  mealOrDrink: PropTypes.string,
  bebidasORcomidas: PropTypes.string,
}.isRequired;
export default StartRecipeButton;
