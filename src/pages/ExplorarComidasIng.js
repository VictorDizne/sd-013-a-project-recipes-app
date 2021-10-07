import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import appContext from '../redux/appcontext';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import Footer from '../components/Footer';

const ExplorarComidasIng = () => {
  const [ingredientsMeals, setIngredientsMeals] = useState([]);
  const { setFetchIngredients, setPageIngredients } = useContext(appContext);
  const history = useHistory();

  async function ingredientsAPI() {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const result = await fetch(endpoint).then((res) => res.json());
    const slicedResult = result.meals.slice(0, Number('12'));
    setIngredientsMeals(slicedResult);
  }

  useEffect(() => {
    ingredientsAPI();
    setPageIngredients(false);
  }, []);

  const handleClick = async (ingredient) => {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const result = await fetch(endpoint).then((res) => res.json());
    const slicedResult = result.meals.slice(0, Number('12'));
    setFetchIngredients(slicedResult);
    setPageIngredients(true);
    history.push('/comidas');
  };

  return (
    <div>
      <HeaderWithoutSearch page="Explorar Ingredientes" />
      { ingredientsMeals.map((ingredient, index) => (
        <button
          type="submit"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => handleClick(ingredient.strIngredient) }
        >
          <h3 data-testid={ `${index}-card-name` }>{ ingredient.strIngredient }</h3>
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
            alt={ ingredient.strIngredient }
          />
        </button>
      )) }
      <Footer />
    </div>
  );
};

export default ExplorarComidasIng;
