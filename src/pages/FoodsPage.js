import React, { useEffect, useContext } from 'react';
import MyContext from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodCard from '../components/FoodCard';

import fetchApi from '../services/api';
import ButtonsFilters from '../components/ButtonsFilters';

function FoodsPage() {
  const { recipe, setMyPage } = useContext(MyContext);

  const LIMITER_FOODS = 12;

  useEffect(() => {
    setMyPage('themealdb');
    // fillRecipesMount();
  }, [setMyPage]);
  

  // const fillRecipesMount = async () => {
  //   console.log(meals);
  //   const { meals } = await fetchApi();
  //   return setRecipe(meals);
  // };

  const returnCard = (item, index) => (
    <FoodCard
      key={ index }
      index={ index }
      thumb="strMealThumb"
      name="strMeal"
      data={ item }
    />
  );
//  if (!recipe.length) return <p>Loading...</p>

  return (
    <div /*style={ { display: 'flex', flexDirection: 'column' } }*/>
      <Header title="Comidas" search />
      <ButtonsFilters />
      <div style={ { display: 'flex', flexWrap: 'wrap' } }>
         { recipe !== null &&
        recipe.map((item, index) => (index >= LIMITER_FOODS
          ? null : returnCard(item, index))) }
      </div>
      <Footer />
    </div>
  );
}

export default FoodsPage;
