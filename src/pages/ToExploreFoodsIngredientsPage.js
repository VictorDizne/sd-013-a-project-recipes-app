import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as myFuncApi from '../services/api';
import IngredientsCard from '../components/IngredientsCard';

function ToExploreFoodsIngredientsPage() {
  const URL = 'https://www.themealdb.com/images/ingredients/';
  const [ingredient1, setIngredient1] = useState([]);
  const maxCard = 12;

  const requestIngredient = async () => {
    const result = await myFuncApi.fetchIngredients('themealdb');
    setIngredient1(result.meals);
  };

  useEffect(() => {
    requestIngredient();
  }, []);

  if (!ingredient1) return <p>Loading...</p>;

  return (
    <div style={ { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' } }>
      <Header title="Explorar Ingredientes" />
      {ingredient1.map((ingredient, index) => (
        index < maxCard && (
          <IngredientsCard
            key={ index }
            index={ index }
            page="comidas"
            ingredient={ ingredient }
            ingredientImg={ `${URL}${ingredient.strIngredient}-Small.png` }
            ingredientName={ ` ${ingredient.strIngredient}` }
          />)
      ))}
      <Footer />
    </div>
  );
}

export default ToExploreFoodsIngredientsPage;
