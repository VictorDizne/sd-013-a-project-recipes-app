import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context';

const NUM_RECIPES = 12;

function RecipeList({ isMeal }) {
  const { filteredMeals, filteredDrinks } = useContext(Context);

  const filteredRecipes = isMeal ? filteredMeals : filteredDrinks;

  return (
    filteredRecipes
      .filter((_recipe, idx) => idx < NUM_RECIPES)
      .map((recipe, idx) => {
        const id = isMeal ? recipe.idMeal : recipe.idDrink;
        const title = isMeal ? recipe.strMeal : recipe.strDrink;
        const thumb = isMeal ? recipe.strMealThumb : recipe.strDrinkThumb;

        return (
          <Link key={ id } to={ `/comidas/${id}` }>
            <section key={ title } data-testid={ `${idx}-recipe-card` }>
              <h2 data-testid={ `${idx}-card-name` }>{title}</h2>
              <img
                src={ thumb }
                data-testid={ `${idx}-card-img` }
                className="img-fluid"
                alt={ title }
              />
            </section>
          </Link>
        );
      })
  );
}

export default RecipeList;
