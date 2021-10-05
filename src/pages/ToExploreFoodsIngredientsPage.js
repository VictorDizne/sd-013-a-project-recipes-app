import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {fetchIngredients} from '../services/api';
import IngredientsCard from '../components/IngredientsCard';

function ToExploreFoodsIngredientsPage() {

  const [ingredient1, setIngredient1] = useState([]);
  const maxCard = 12;
 console.log(ingredient1[0], 'ingredient');
  useEffect(() => {
    const requestIngredient = async() => {
      const result = await fetchIngredients('themealdb');
      setIngredient1(result.meals);
    }
    requestIngredient();
  }, [])

  // const URL = 'https://www.themealdb.com/images/ingredients/';  
  if (!ingredient1) return <p>Loading...</p>
  return (
    <div style={ { display: 'flex', flexDirection: 'row', flexWrap: 'wrap'} }>
      <Header title="Explorar Ingredientes" />
      {ingredient1.map((ingredient, index) => (
        index < maxCard ? (      
      <IngredientsCard
       key={index}
       index={index}
       ingredientImg={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`}
       ingredientName={` ${ingredient.strIngredient}`}
      />) : (null)
      ))} 
      <Footer />
    </div>
  );
}

export default ToExploreFoodsIngredientsPage;
