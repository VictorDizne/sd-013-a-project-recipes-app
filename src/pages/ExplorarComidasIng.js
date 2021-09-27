import React, { useState, useEffect } from 'react';
// import appContext from '../redux/appcontext';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import Footer from '../components/Footer';

const ExplorarComidasIng = () => {
  const [ingredientsMeals, setIngredientsMeals] = useState([]);

  async function fecthIngredients() {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const result = await fetch(endpoint).then((res) => res.json());
    const slicedResult = result.meals.slice(0, Number('12'));
    setIngredientsMeals(slicedResult);
  }

  useEffect(() => {
    fecthIngredients();
  }, []);

  return (
    <div>
      <HeaderWithoutSearch page="Explorar Ingredientes" />
      {ingredientsMeals.map((ingredient, index) => (
        <button
          type="submit"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
        >
          <h3 data-testid={ `${index}-card-name` }>{ ingredient.strIngredient}</h3>
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
            alt={ ingredient.strIngredient }
          />
        </button>
      ))}
      <Footer />
    </div>
  );

  /* return (
    <div>
      {mealsApi.map((receita, index) => (
        <button
          type="button"
          key={ receita.strMeal }
          data-testid={ `${index}-recipe-card` }
          onClick={ () => history.push(`/comidas/${receita.idMeal}`) }
        >
          <h3 data-testid={ `${index}-card-name` }>
            {receita.strMeal}
          </h3>
          <img
            data-testid={ `${index}-card-img` }
            src={ receita.strMealThumb }
            alt={ receita.strMeal }
            width="150px"
          />
        </button>
      ))}
    </div>
  ); */
};

export default ExplorarComidasIng;
