import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodSearchBar from '../components/FoodSearchBar';
import FilterRecipes from '../components/FilterRecipes';
import {
  fetchAllFoodRecipes,
  fetchFoodRecipesByCategory,
} from '../services/fetchRecipes';

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 10px;
`;

const Main = styled.main`
  margin-top: 68px;
  form{
    margin: 0 10px;
  }
`;

const Foods = () => {
  const [searchBarStatus, setSearchBarStatus] = useState(false);
  const [foodRecipes, setFoodRecipes] = useState([]);

  useEffect(() => {
    fetchAllFoodRecipes(setFoodRecipes);
  }, []);

  const handleFilter = ({ target: { name } }) => (
    name === 'All'
      ? fetchAllFoodRecipes(setFoodRecipes)
      : fetchFoodRecipesByCategory(name, setFoodRecipes)
  );

  const filterRecipes = (
    <FilterRecipes
      pageTitle="Comidas"
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
    <Main>
      <Header title="Comidas" setSearchBarStatus={ setSearchBarStatus } />
      {
        searchBarStatus ? foodSearchBar : filterRecipes
      }
      <CardList className="recipeList">
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
      </CardList>
      <Footer />
    </Main>
  );
};

export default Foods;
