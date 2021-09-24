import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';

const date = new Date();

const payloadObject = (recipe, spec) => (
  {
    id: spec === 'Meal' ? recipe.idMeal : recipe.idDrink,
    type: spec === 'Meal' ? 'comida' : 'bebida',
    area: recipe.strArea ? recipe.strArea : '',
    category: recipe.strCategory ? recipe.strCategory : '',
    alcoholicOrNot: spec === 'Meal' ? '' : recipe.strAlcoholic,
    name: spec === 'Meal' ? recipe.strMeal : recipe.strDrink,
    image: spec === 'Meal' ? recipe.strMealThumb : recipe.strDrinkThumb,
    doneDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    tags: recipe.strTags ? recipe.strTags.split(',') : [],
  }
);

function InProgressFinishButton({ spec }) {
  const type = spec === 'Meal' ? 'meals' : 'cocktails';
  const { id } = useParams();
  const dispatch = useDispatch();
  const inProgRecs = useSelector((state) => state.recipes.inProgressRecipes[type][id]); // Acessa o objeto das receitas em progresso;
  const doneRecs = useSelector((state) => state.recipes.doneRecipes); // Acessa o array de receitas finalizadas;
  const recipe = useSelector((state) => state.api.recipe); // Acessa o objeto com as infos da receita;
  const history = useHistory();
  const [disable, setDisable] = useState(true); // Estado que controla se o botão está disabilitado ou não;

  useEffect(() => {
    const ingredientSteps = Array.from(document.querySelectorAll('input[type=checkbox]'));
    setDisable(!(ingredientSteps.every((ing) => ing.checked)));
  }, [inProgRecs]);

  const finishRec = () => {
    dispatch({ type: 'FINISH_RECIPE', payload: payloadObject(recipe, spec) });
    history.push('/receitas-feitas');
  };

  if (doneRecs.some((rec) => rec.id === id)) return <Redirect to="/receitas-feitas" />;
  return (
    <div>
      <button
        type="button"
        className="InProgress-finish-btn"
        data-testid="finish-recipe-btn"
        disabled={ disable }
        onClick={ finishRec }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default InProgressFinishButton;

InProgressFinishButton.propTypes = {
  spec: PropTypes.string.isRequired,
};
