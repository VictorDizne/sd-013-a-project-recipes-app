import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import * as myFunc from '../services/api';

function ToExploreDrinksPage() {
  const [randonRecipes, setRandonRecipes] = useState('');

  const requestRecipeRandom = async () => {
    const { drinks } = await myFunc.fetchRandonRecipes('thecocktaildb');
    setRandonRecipes(drinks[0]);
  };
  useEffect(() => {
    requestRecipeRandom();
  }, []);

  return (
    <div>
      <Header title="Explorar Bebidas" />

      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>

      <Link to={ `/bebidas/${randonRecipes.idDrink}` }>
        <button
          type="button"
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
