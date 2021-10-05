import React, { useEffect } from 'react';
import { useDebugState } from 'use-named-state';
import Header from '../components/ComponentHeader';
import ComponentFooter from '../components/ComponentFooter';

function ExplorarBebidasIngredientes() {
  const [ingredientDrink,
    setIngredientDrink,
  ] = useDebugState('ingredientesBebidas', []);

  useEffect(() => {
    async function fetchDrink() {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const fetchApiDrink = await fetch(URL);
      const dataDrink = await fetchApiDrink.json();
      const NUM = 12;
      const ingredientList = dataDrink.drinks.slice(0, NUM);
      const IngredientName = ingredientList.map((item) => (item.strIngredient1));
      setIngredientDrink(IngredientName);
    }
    fetchDrink();
  }, []);

  return (
    <div>
      <Header
        title="Explorar Ingredientes"
        hideSearch
        hideProfile={ false }
      />
      <ComponentFooter />
      {ingredientDrink.map((item, index) => (
        <div data-testid={ `${index}-ingredient-card` } key={ index }>
          <img
            data-testid={ `${index}-card-img` }
            alt="drink"
            src={ `https://www.thecocktaildb.com/images/ingredients/${item}-Small.png` }
          />
          <h1 data-testid={ `${index}-card-name` }>{ item }</h1>
        </div>
      ))}
    </div>
  );
}

export default ExplorarBebidasIngredientes;
