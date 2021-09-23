import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/index';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import { fetchDrinkCategories } from '../services/bebidasApi';

const Drinks = () => {
  const { data, handleDrinksApisOnload, setDrinkCategories } = useContext(RecipesContext);
  const [buttons, setButtons] = useState([]);
  const MAX_BUTTONS = 5;
  const MAX_RECIPES = 12;

  useEffect(() => {
    handleDrinksApisOnload();
    const fetchButtons = async () => {
      const response = await fetchDrinkCategories();
      setButtons(response);
    };
    fetchButtons();
  }, []);

  return (
    <div>
      <Header title="Bebidas" hasSearchIcon page="drinks" />
      <div>
        { buttons && buttons.slice(0, MAX_BUTTONS).map((b, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${b.strCategory}-category-filter` }
            onClick={ () => setDrinkCategories(b.strCategory) }
          >
            { b.strCategory }
          </button>
        ))}
      </div>
      <div>
        { data && data.slice(0, MAX_RECIPES).map(((recipe, index) => (
          <RecipeCard key={ index } index={ index } recipe={ recipe } page="drinks" />
        )))}
      </div>
      <Footer />
    </div>
  );
};

export default Drinks;
