import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/index';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
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

  return (
    <div>
      <Header title="Comidas" hasSearchIcon page="foods" />
      <div>
        <div>
          { buttons && buttons.slice(0, MAX_BUTTONS).map((b, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `${b.strCategory}-category-filter` }
              onClick={ () => setFoodCategories(b.strCategory) }
            >
              { b.strCategory }
            </button>
          ))}
          <div className="Recipes-Container">
            { mealData && mealData.slice(0, MAX_RECIPES).map(((recipe, index) => (
              <RecipeCard key={ index } index={ index } recipe={ recipe } page="foods" />
            )))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Foods;
