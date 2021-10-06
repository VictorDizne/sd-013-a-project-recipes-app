import React, { useEffect, useState, useContext } from 'react';
import { Header, Footer, FoodCard } from '../components';
import MyContext from '../context/Context';
import * as myFuncApi from '../services/api';

function ToExploreFoodsInArea() {
  const { recipes, setMyPage, myPage, setRecipes } = useContext(MyContext);
  const [allArea, setAllArea] = useState([]);
  const [selectArea, setSelectArea] = useState('All');
  const LIMITER_FOODS = 12;

  const setAreaRecipes = async () => {
    const { meals } = await myFuncApi.fetchAreaRecipes();
    setAllArea(meals);
  };

  const randonRecipes = async () => {
    if (selectArea === 'All') {
      const { meals } = await myFuncApi.fetchRandonRecipes(myPage);
      setRecipes(meals);
    } else {
      const { meals } = await myFuncApi.fetchRecipesByArea(selectArea);
      setRecipes(meals);
    }
  };

  useEffect(() => {
    setAreaRecipes();

    setMyPage('themealdb');
    if (myPage !== '') {
      randonRecipes();
    }
  }, [setMyPage, myPage, selectArea]);

  const returnOption = (item, index) => (
    <option
      key={ index }
      data-testid={ `${item.strArea}-option` }
    >
      { item.strArea }
    </option>
  );

  const returnCard = (item, index) => (
    <FoodCard
      key={ index }
      index={ index }
      thumb="strMealThumb"
      name="strMeal"
      id="idMeal"
      route="comidas"
      data={ item }
    />
  );

  return (
    <div>
      <Header title="Explorar Origem" search />
      <label htmlFor="area">
        <select
          name="area"
          data-testid="explore-by-area-dropdown"
          onChange={ ({ target }) => setSelectArea(target.value) }
        >
          <option data-testid="All-option">All</option>
          { allArea.map((item, index) => returnOption(item, index)) }
        </select>
      </label>
      <div style={ { display: 'flex', flexWrap: 'wrap' } }>
        { recipes !== null
          && recipes.map((item, index) => (index >= LIMITER_FOODS
            ? null : returnCard(item, index))) }
      </div>
      <Footer />
    </div>
  );
}

export default ToExploreFoodsInArea;
