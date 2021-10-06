import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/ComponentHeader';
import ComponentFooter from '../components/ComponentFooter';

const foodListSize = 12;
function ExplorarComidasIngredientes() {
  const [ingredientArray, setIngredientArray] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const filteredIngredients = fetch(
      'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
    );

    filteredIngredients
      .then((result) => result.json())
      .then((json) => {
        console.log({ json });
        setIngredientArray(json.meals);
      });
    console.log(filteredIngredients);
  }, []);
  const handleClickCard = (ingredientName) => history
    .push(`/comidas?i=${ingredientName}`);
  function IngredientList() {
    const results = ingredientArray.map((ingredient, index) => index < foodListSize && (
      <div
        key={ index }
        onClick={ () => handleClickCard(ingredient.strIngredient) }
        onKeyPress={ () => handleClickCard(ingredient.strIngredient) }
        data-testid={ `${index}-ingredient-card` }
        role="button"
        tabIndex={ index }
      >

        <img
          alt={ ingredient.strIngredient }
          data-testid={ `${index}-card-img` }
          src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
        />
        <p data-testid={ `${index}-card-name` }>
          {ingredient.strIngredient}
        </p>
      </div>));
    return results;
  }

  return (
    <div>
      <Header title="Explorar Ingredientes" hideSearch />
      <IngredientList />
      <ComponentFooter />
    </div>

  );
}

export default ExplorarComidasIngredientes;