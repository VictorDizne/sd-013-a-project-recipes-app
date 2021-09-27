import React, { useState, useEffect } from 'react';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import Footer from '../components/Footer';

const ExplorarBebidasIng = () => {
  const [ingredientsDrinks, setIngredientsDrinks] = useState([]);

  async function fecthDrinks() {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const result = await fetch(endpoint).then((res) => res.json());
    const slicedResult = result.drinks.slice(0, Number('12'));
    setIngredientsDrinks(slicedResult);
  }

  useEffect(() => {
    fecthDrinks();
  }, []);

  return (
    <div>
      <HeaderWithoutSearch page="Explorar Bebidas" />
      {ingredientsDrinks.map((drink, index) => (
        <button
          type="submit"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
        >
          <h3 data-testid={ `${index}-card-name` }>{ drink.strIngredient1}</h3>
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
            alt={ drink.strIngredient1 }
            /* width="150px" */
            // `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`
          />
        </button>
      ))}
      <Footer />
    </div>
  );
};

export default ExplorarBebidasIng;
