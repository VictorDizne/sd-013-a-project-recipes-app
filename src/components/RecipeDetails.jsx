import React from 'react';

function RecipeDetails(props) {
  const {
    ingredients,
    instructions,
    ingredientMeasures,
    video,
    isFoodRecipe,
  } = props;

  console.log(ingredients);
  return (
    <section className="recipeDetails">
      <h3>Ingredientes</h3>
    	<ul>
    		{
          ingredients.map((ingredient, idx) => (
            <li
            key={ `${ingredient}-${idx}` }
            data-testid={ `${idx}-ingredient-name-and-measure` }
    				>
    					{ ingredient }
    					-
    					{ ingredientMeasures[idx] }
    				</li>
    			))
    		}
    	</ul>
    	<h3>Instruções de Preparo</h3>
    	<p data-testid="instructions">{ instructions }</p>
    	{ isFoodRecipe && video }
    </section>
  );
};

export default RecipeDetails;