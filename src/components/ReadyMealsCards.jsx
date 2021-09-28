import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import appContext from '../contexts/appContext';

function ReadyReceipesCards() {
  const { filterDoneFood } = useContext(appContext);
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  return (
    <section>
      {
        doneRecipes.filter((doneRecipe) => doneRecipe.type === filterDoneFood)
          .map((doneRecipe, index) => (
            <div key={ index }>
              <Link to={ `/comidas${doneRecipe.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ doneRecipe.image }
                  alt={ doneRecipe.name }
                />
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { doneRecipe.category }
              </p>
              <Link to={ `/comidas${doneRecipe.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>
                  { doneRecipe.name }
                </p>
              </Link>
              <p data-testid={ `${index}-horizontal-done-date` }>
                { doneRecipe.doneDate }
              </p>
              <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
                <img src={ shareIcon } alt="drink-icon" />
              </button>
              {doneRecipe.tags.map((tag, indexTag) => (
                <span
                  key={ indexTag }
                  data-testid={ `${indexTag}-${tag}-horizontal-tag` }
                >
                  {tag}
                </span>
              ))}
            </div>
          ))
      }
    </section>
  );
}

export default ReadyReceipesCards;
