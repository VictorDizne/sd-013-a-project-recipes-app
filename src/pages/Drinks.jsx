import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MasterCard from '../components/MasterCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterRecipes from '../components/FilterRecipes';
import DrinkSearchBar from '../components/DrinkSearchBar';
import {
  fetchAllDrinkRecipes,
  fetchDrinkRecipesByCategory,
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

const Drink = () => {
  const [searchBarStatus, setSearchBarStatus] = useState(false);
  const [drinkRecipes, setDrinkRecipes] = useState([]);
  const [prevCategory, setCategory] = useState('All');

  useEffect(() => {
    fetchAllDrinkRecipes(setDrinkRecipes);
  }, []);

  const handleFilter = ({ target: { name } }) => {
    switch (name) {
    case 'All':
      fetchAllDrinkRecipes(setDrinkRecipes);
      break;
    case prevCategory:
      fetchAllDrinkRecipes(setDrinkRecipes);
      setCategory('All');
      break;
    default:
      fetchDrinkRecipesByCategory(name, setDrinkRecipes);
      setCategory(name);
      break;
    }
  };

  const filterRecipes = (
    <FilterRecipes
      pageTitle="Bebidas"
      handleFilter={ handleFilter }
    />
  );

  const drinkSearchBar = (
    <DrinkSearchBar
      setSearchBarStatus={ setSearchBarStatus }
      setDrinkRecipes={ setDrinkRecipes }
    />
  );

  return (
    <Main>

      <Header title="Bebidas" setSearchBarStatus={ setSearchBarStatus } />
      {
        searchBarStatus ? drinkSearchBar : filterRecipes
      }

      <CardList className="recipeList">
        {
          drinkRecipes.map((drinkRecipe, index) => (
            <Link
              to={ `bebidas/${drinkRecipe.idDrink}` }
              key={ `${drinkRecipe}${index}` }
              className="recipeCard"
            >
              <MasterCard
                index={ index }
                src={ drinkRecipe.strDrinkThumb }
                title={ drinkRecipe.strDrink }
                className="recipeCard"
                cardType="drinkRecipe"
              />
            </Link>
          ))
        }
      </CardList>

      <Footer />
    </Main>
  );
};

export default Drink;
