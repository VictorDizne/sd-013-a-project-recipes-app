import React from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function DrinkDetails() {
  // const [setRecipeDrink] = useState([]);
  // const { ingredients, setIngredients } = useState([]);

  // useEffect(() => {
  //   const getRecipesDrinks = async () => {
  //     const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319';
  //     const [drink] = await fetch(endpoint).then((data) => data.json());
  //   };
  //   getRecipesDrinks(drink);
  // }, []);

  // const [data, recipeDrinks, setRecipeDrinks] = useState(['']);
  // const ingredients = [{ title: 1 }, { title: 2 }, { title: 3 }];
  // const { id: recipeId } = useParams();

  // useEffect(() => {
  //   const foodRecipe = async (id) => {
  //     const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  //     const { meals } = await fetch(endpoint)
  //       .then((response) => response.json());
  //     setRecipeDrinks(meals);
  //     console.log();
  //   };
  //   foodRecipe();
  // }, []);

  // const recipesData = [...recipeDrinks];
  return (
    <section>
      <div>
        <img
          data-testid="recipe-photo"
          alt="receita pronta"
        />
        <button
          data-testid="share-btn"
          type="button"
          key={ shareIcon }
        >
          <img src={ shareIcon } alt="share-icon" />
        </button>
        <button
          data-testid="favorite-btn"
          type="button"
          key={ blackHeartIcon }

        >
          <img src={ blackHeartIcon } alt="favorite-icon" />
        </button>
        <p data-testid="recipe-category" />
        {/* {ingredients.map((ingredient, index) => (
          <p
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient.title}
          </p>
        ))} */}
      </div>
      <div>
        <ul>
          <li
            data-testid="`$-ingredient-name-and-measure`"
          />

        </ul>
        <p data-testid="instructions" />
        <h3>Instructions</h3>

        <div>Recomendadas</div>
        <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
      </div>
      <div>
        <iframe
          src=""
          title="video"
        />
      </div>
    </section>

  );
}

export default DrinkDetails;
