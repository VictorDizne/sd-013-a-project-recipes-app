import React, { useContext } from 'react';
import { useHistory as UseHistory, useLocation } from 'react-router-dom';
import { RecommendedRecipes } from '../components/index';
import '../components/Footer.css';
import MyConText from '../context/Context';
import EspecificRecipe from '../components/EspecificRecipe';

export default function EspecificFood() {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const history = UseHistory();
  const { handleIngredientIndex, ingredientIndex } = useContext(MyConText);

  const redirectInProgress = () => {
    handleIngredientIndex(2);
    const getItemLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({
        ...getItemLocalStorage, meals: { ...getItemLocalStorage.meals, [id]: [] } }));
    history.push(`/comidas/${id}/in-progress`);
  };

  return (
    <div>
      <EspecificRecipe
        nameApi="themealdb"
        id={ id }
        drinkOrMeals="meals"
        imgAndTitle="Meal"
        objType="comida"
        food
      />
      {(ingredientIndex === 1) && <RecommendedRecipes
        nameApi="thecocktaildb"
        drinkOrMeals="drinks"
        imgAndTitle="Drink"
        linkMealOrDrink="bebidas"
      />}
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="footer"
        onClick={ redirectInProgress }
      >
        Iniciar Receita
      </button>
    </div>
  );
}
