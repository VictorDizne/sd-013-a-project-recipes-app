import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

import { Link } from 'react-router-dom';
import * as myFunc from '../services/api';


function ToExploreDrinksPage() {

  const [randonRecipes, setRandonRecipes] =useState('')
 

  const requestRecipeRandom = async() => {
const { drinks } = await myFunc.fetchRecipesRamdon('thecocktaildb');
setRandonRecipes(drinks[0]);
const { idDrink } = drinks[0]; 
console.log(drinks[0]);
}
  useEffect(() => {
  requestRecipeRandom()
  },[])
  
  return (
    <div>
      <Header title="Explorar Bebidas" />

      <Link to='/explorar/bebidas/ingredientes'>
        <button 
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>     

      <Link to={`/bebidas/${randonRecipes.idDrink}`}>  
        <button 
          data-testid="explore-surprise"
        > 
          Me Surpreenda!
        </button>
      </Link>
      
      <Footer />
    </div>
  );
}

export default ToExploreDrinksPage;
