import React, { useEffect, useContext } from 'react';
import MyContext from '../context/Context';
import Header from '../components/Header';
import FoodCard from '../components/FoodCard';

function DrinksPage() {
  const { recipe, setMyPage } = useContext(MyContext);

  const LIMITER_FOODS = 12;

  useEffect(() => {
    setMyPage('thecocktaildb');
  }, [setMyPage]);

  const returnCard = (item, index) => (
    <FoodCard
      key={ index }
      index={ index }
      thumb="strMealThumb"
      data={ item }
    />
  );

  return (
    <div>
      <Header title="Bebidas" search />
      <div style={ { display: 'flex', flexWrap: 'wrap' } }>
        { recipe
          .map((item, index) => (index >= LIMITER_FOODS
            ? null : returnCard(item, index))) }
      </div>
    </div>
  );
}

export default DrinksPage;
