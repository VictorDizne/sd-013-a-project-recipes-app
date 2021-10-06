import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MainContext } from '../context/Provider';
import ReciperCard from '../components/RecipeCard';
import { fetchRecipes } from '../services';

const MAX_INDEX = 12;

function Drinks() {
  const { recipes, setRecipes, byIngredients } = useContext(MainContext);

  useEffect(() => {
    if (!byIngredients.bool) {
      const fetchData = async () => {
        const data = await fetchRecipes('', 'name', '/bebidas');
        setRecipes(data);
      };
      fetchData();
    } else {
      const fetchData = async () => {
        const data = await fetchRecipes(
          byIngredients.ingredient, 'ingredient', '/bebidas',
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
          key={ recipe.idDrink }
          idRecipe={ recipe.idDrink }
          index={ index }
          name={ recipe.strDrink }
          img={ recipe.strDrinkThumb }
        />))}
      <Footer />
    </>
  );
}

export default Drinks;
