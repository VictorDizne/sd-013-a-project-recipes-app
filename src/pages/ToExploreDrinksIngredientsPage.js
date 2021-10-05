import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {fetchIngredients} from '../services/api';
import IngredientsCard from '../components/IngredientsCard';
// import { Link } from 'react-router-dom';

function ToExploreDrinksIngredientsPage() {

  const [ingredient1, setIngredient1] = useState([]);
  const maxCard = 12;
  
  useEffect(() => {
    const requestIngredient = async() => {
      const result = await fetchIngredients('thecocktaildb');
      setIngredient1(result.drinks);
    }
    requestIngredient();
      
    }, [])

  const URL = 'https://www.thecocktaildb.com/images/ingredients/';

  return (
    <div style={ { display: 'flex', flexDirection: 'row', flexWrap: 'wrap'} }>
      <Header title="Explorar Ingredientes" />
      {ingredient1.map((ingredient, index) => (
        index < maxCard ? ( 
              
        <IngredientsCard
        key={index}
        index={index}
        ingredientImg={`${URL}${ingredient.strIngredient1}-Small.png`}
        ingredientName={` ${ingredient.strIngredient1}`}
        />) : (null)
        ))}
  
      <Footer />
    </div>
  );
}

export default ToExploreDrinksIngredientsPage;
