import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MainContext } from '../context/Provider';
import ReciperCard from '../components/RecipeCard';
import { fetchRecipes } from '../services';

const MAX_INDEX = 12;

function Meals() {
  const { recipes, setRecipes, byIngredients } = useContext(MainContext);

  useEffect(() => {
    if (!byIngredients.bool) {
      const fetchData = async () => {
        const data = await fetchRecipes('', 'name', '/comidas');
        setRecipes(data);
      };
      fetchData();
    } else {
      const fetchData = async () => {
        const data = await fetchRecipes(
          byIngredients.ingredient, 'ingredient', '/comidas',
        );
        setRecipes(data);
      };
      fetchData();
    }
  }, [byIngredients.bool, byIngredients.ingredient, setRecipes]);

  return (
    <>
      <Header />
      {recipes.length > 0 && recipes.slice(0, MAX_INDEX).map((recipe, index) => (
        <ReciperCard
          key={ recipe.idMeal }
          idRecipe={ recipe.idMeal }
          index={ index }
          name={ recipe.strMeal }
          img={ recipe.strMealThumb }
        />))}
      <Footer />
    </>
  );
}

export default Meals;
