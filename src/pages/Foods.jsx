import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodSearchBar from '../components/FoodSearchBar';
import FilterRecipes from '../components/FilterRecipes';
import {
  fetchAllFoodRecipes,
  fetchFoodRecipesByCategory,
} from '../services/fetchRecipes';

const Foods = () => {
  const [searchBarStatus, setSearchBarStatus] = useState(false);
  const [foodRecipes, setFoodRecipes] = useState([]);

  useEffect(() => {
    fetchAllFoodRecipes(setFoodRecipes);
  }, []);

  const handleFilter = ({ target: { name } }) => (
    name === 'ALL'
      ? fetchAllFoodRecipes(setFoodRecipes)
      : fetchFoodRecipesByCategory(name, setFoodRecipes)
  );

  const filterRecipes = (
    <FilterRecipes
      pageTitle="comidas"
      handleFilter={ handleFilter }
    />
  );

  const foodSearchBar = (
    <FoodSearchBar
      setSearchBarStatus={ setSearchBarStatus }
      title="comidas"
      setFoodRecipes={ setFoodRecipes }
    />
  );

  return (
    <main>
      <Header title="comida" />
      {
        searchBarStatus ? filterRecipes : foodSearchBar
      }
      <section className="recipeList">
        {
          foodRecipes.map((foodRecipe, index) => (
            <Link
              to={ `comidas/${foodRecipe.idMeal}` }
              key={ `${foodRecipe}${index}` }
              className="recipeCard"
            >
              <RecipeCard
                index={ index }
                src={ foodRecipe.strMealThumb }
                title={ foodRecipe.strMeal }
                className="recipeCard"
              />
            </Link>
          ))
        }
      </section>
      <Footer />
    </main>
  );
};

export default Foods;
