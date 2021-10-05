import React, { useEffect } from 'react';
import { useDebugState } from 'use-named-state';
import Header from '../components/ComponentHeader';
import ComponentFooter from '../components/ComponentFooter';

function ExplorarComidasIngredientes() {
  const [ingredientFood, setIngredientFood] = useDebugState('ingredientes', []);

  useEffect(() => {
    async function fetchFood() {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const fetchApiFood = await fetch(URL);
      const dataFood = await fetchApiFood.json();
      const NUM = 12;
      const ingredientList = dataFood.meals.slice(0, NUM);
      const IngredientName = ingredientList.map((item) => (item.strIngredient));
      setIngredientFood(IngredientName);
    }
    fetchFood();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" hideSearch hideProfile={ false } />
      <ComponentFooter />
      {ingredientFood.map((item, index) => (
        <div data-testid={ `${index}-ingredient-card` } key={ index }>
          <img
            data-testid={ `${index}-card-img` }
            alt="food"
            src={ `https://www.themealdb.com/images/ingredients/${item}-Small.png` }
          />
          <h1 data-testid={ `${index}-card-name` }>{ item }</h1>
        </div>
      ))}
    </div>

  );
}

export default ExplorarComidasIngredientes;
