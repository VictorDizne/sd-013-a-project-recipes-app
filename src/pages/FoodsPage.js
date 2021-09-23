import React, { useEffect, useContext } from 'react';
import MyContext from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodCard from '../components/FoodCard';

function FoodsPage() {
  const { recipe, setMyPage } = useContext(MyContext);

  const LIMITER_FOODS = 12;

  useEffect(() => {
    setMyPage('themealdb');
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
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <Header title="Comidas" search />
    <div>
      <Header title="Comidas" search />
      <div style={ { display: 'flex', flexWrap: 'wrap' } }>
        { recipe
          .map((item, index) => (index >= LIMITER_FOODS
            ? null : returnCard(item, index))) }
      </div>
      <Footer />
    </div>
  );
}

export default FoodsPage;
