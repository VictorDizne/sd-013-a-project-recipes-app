import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/ComponentHeader';
import ComponentFooter from '../components/ComponentFooter';

const foodListSize = 12;
function ExplorarComidasIngredientes() {
  const [ingredientArray, setIngredientArray] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const filteredIngredients = fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
    );
    filteredIngredients
      .then((result) => result.json())
      .then((json) => {
        console.log({ json });
        setIngredientArray(json.drinks);
      });
    console.log(filteredIngredients);
  }, []);

  const handleClickCard = (ingredientName) => history
    .push(`/bebidas?i=${ingredientName}`);

  function IngredientList() {
    const results = ingredientArray.map((ingredient, index) => index < foodListSize && (
      <div
        key={ index }
        onClick={ () => handleClickCard(ingredient.strIngredient1) }
        onKeyPress={ () => handleClickCard(ingredient.strIngredient1) }
        data-testid={ `${index}-ingredient-card` }
        role="button"
        tabIndex={ index }
      >

        <img
          alt={ ingredient.strIngredient }
          data-testid={ `${index}-card-img` }
          src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
        />
        <p data-testid={ `${index}-card-name` }>
          {ingredient.strIngredient1}
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