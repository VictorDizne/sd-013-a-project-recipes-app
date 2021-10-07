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
        setIngredientArray(json.drinks);
      });
  }, []);

  const handleClickCard = (ingredientName) => history
    .push(`/bebidas?i=${ingredientName}`);

  function IngredientList() {
    const results = ingredientArray.map((ingredient, index) => index < foodListSize && (
      <div
        className="button-card"
        key={ index }
        onClick={ () => handleClickCard(ingredient.strIngredient1) }
        onKeyPress={ () => handleClickCard(ingredient.strIngredient1) }
        data-testid={ `${index}-ingredient-card` }
        role="button"
        tabIndex={ index }
      >
        <div className="card-img-contain">
          <img
            alt={ ingredient.strIngredient }
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
          />
          <div className="recipe-title">
            <p data-testid={ `${index}-card-name` }>
              {ingredient.strIngredient1}
            </p>
          </div>
        </div>
      </div>));
    return results;
  }

  return (
    <div>
      <Header title="Explorar Ingredientes" hideSearch />
      <div className="list-container">
        <IngredientList />
      </div>
      <ComponentFooter />
    </div>

  );
}

export default ExplorarComidasIngredientes;
