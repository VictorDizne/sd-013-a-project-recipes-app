import React, { useEffect, useContext } from 'react';
import appContext from '../contexts/appContext';

function ReadyDrinksCards() {
  const { filterDoneFood } = useContext(appContext);
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    if (filterDoneFood !== 'all') {
      // doneRecipes = doneRecipes.filter((recipe) => recipe[filterDoneFood]);
      console.log('hah', doneRecipes);
    }
  }, [filterDoneFood]);

  return (
    <section>
      {doneRecipes.map((doneRecipe, index) => (
        <div key={ index + 1 }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ doneRecipe.image }
            alt={ doneRecipe.name }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>
            {doneRecipe.area}
          </p>
          <p data-testid={ `${index}-horizontal-name` }>
            {doneRecipe.name}
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {doneRecipe.doneDate}
          </p>
          <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
            botão de compartilhar
          </button>
          <span data-testid={ `${index}-${doneRecipe.strTags}-horizontal-tag` }>
            {doneRecipe.tags}
          </span>
        </div>
      ))}
    </section>
  );
}

export default ReadyDrinksCards;
