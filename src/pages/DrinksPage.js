import React, { useEffect, useContext } from 'react';
import MyContext from '../context/Context';
import * as myFunc from '../services/api';
import { Header, Footer, FoodCard, ButtonsFilters } from '../components';

function DrinksPage() {
  const { recipes, setMyPage, myPage, setRecipes } = useContext(MyContext);

  const LIMITER_FOODS = 12;

  const randonRecipes = async () => {
    const { drinks } = await myFunc.fetchRandonRecipes(myPage);
    setRecipes(drinks);
  };

  const setInProgressRecipeLocalStorage = () => {
    const progressRecipe = {
      cocktails: {},
      meals: {}
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipe));
  }

  const setFavoriteRecipeLocalStorage = () => {
    const favoriteRecipe = []
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));
  }

  useEffect(() => {
    const progressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if ( !progressRecipe ) {
      setInProgressRecipeLocalStorage()
    }

    const favoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if ( !favoriteRecipe ) {
      setFavoriteRecipeLocalStorage()
    }

    setMyPage('thecocktaildb');
    if (myPage !== '') {
      randonRecipes();
    }
  }, [setMyPage, myPage]);

  const returnCard = (item, index) => (
    <FoodCard
      key={ index }
      index={ index }
      thumb="strDrinkThumb"
      name="strDrink"
      id="idDrink"
      data={ item }
      route="bebidas"
    />
  );

  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <Header title="Bebidas" search />
      <ButtonsFilters page="drinks" />
      <div style={ { display: 'flex', flexWrap: 'wrap' } }>
        {recipes !== null
          && recipes.map((item, index) => (index >= LIMITER_FOODS ? null : returnCard(item, index)))}
      </div>
      <Footer />
    </div>
  );
}

export default DrinksPage;
