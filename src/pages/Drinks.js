import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/index';
import Header from '../components/Header';
import DrinkCard from '../components/DrinkCard';
import Footer from '../components/Footer';
import { fetchDrinkCategories } from '../services/bebidasApi';
import '../styles/Recipes.css';

const Drinks = () => {
  const {
    drinkData,
    handleDrinksApisOnload,
    setDrinkCategories } = useContext(RecipesContext);
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

  const filterCategories = (value) => {
    setDrinkCategories((currValue) => (currValue && currValue === value ? '' : value));
    handleDrinksApisOnload();
  };

  const showAllDrinks = () => {
    handleDrinksApisOnload();
  };

  return (
    <div>
      <Header title="Bebidas" hasSearchIcon page="drinks" />
      <div>
        <div>
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ showAllDrinks }
          >
            All
          </button>
          { buttons && buttons.slice(0, MAX_BUTTONS).map((b, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `${b.strCategory}-category-filter` }
              onClick={ () => filterCategories(b.strCategory) }
            >
              { b.strCategory }
            </button>
          ))}
        </div>
        <div className="recipes-container">
          { drinkData && drinkData.slice(0, MAX_RECIPES).map(((recipe, index) => (
            <DrinkCard key={ index } index={ index } recipe={ recipe } page="drinks" />
          )))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Drinks;
