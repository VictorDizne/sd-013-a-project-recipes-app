import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

import * as myFunc from '../services/api';

function ToExploreFoodsPage() {
  const [randonRecipes, setRandonRecipes] = useState('');

  const requestRecipeRandom = async () => {
    const { meals } = await myFunc.fetchRecipesRandom('themealdb');
    setRandonRecipes(meals[0]);
  };
  useEffect(() => {
    requestRecipeRandom();
  }, []);

  return (
    <div>
      <Header title="Explorar Comidas" />

      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>

      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>

      <Link to={ `/comidas/${randonRecipes.idMeal}` }>
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

export default ToExploreFoodsPage;
