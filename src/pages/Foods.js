import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/index';
import Header from '../components/Header';
import MealCard from '../components/MealCard';
import Footer from '../components/Footer';
import { fetchFoodCategories } from '../services/comidasApi';
import '../styles/Food.css';

const Foods = () => {
  const { mealData,
    handleMealsApisOnLoad,
    setFoodCategories } = useContext(RecipesContext);
  const [buttons, setButtons] = useState([]);
  const MAX_RECIPES = 12;
  const MAX_BUTTONS = 5;

  useEffect(() => {
    handleMealsApisOnLoad();
    const fetchButtons = async () => {
      const response = await fetchFoodCategories();
      setButtons(response);
    };
    fetchButtons();
  }, []);

  const filterCategories = (value) => {
    setFoodCategories((currValue) => (currValue && currValue === value ? '' : value));
    handleMealsApisOnLoad();
  };

  const showAllFoods = () => {
    handleMealsApisOnLoad();
  };

  return (
    <div>
      <Header title="Comidas" hasSearchIcon page="foods" />
      <div>
        <div>
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ showAllFoods }
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
          <div className="Recipes-Container">
            { mealData && mealData.slice(0, MAX_RECIPES).map(((recipe, index) => (
              <MealCard key={ index } index={ index } recipe={ recipe } page="foods" />
            )))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Foods;
