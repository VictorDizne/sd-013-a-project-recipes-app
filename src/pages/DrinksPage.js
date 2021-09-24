import React, { useEffect, useContext } from 'react';
import MyContext from '../context/Context';
import { Header, Footer, FoodCard } from '../components';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import FoodCard from '../components/FoodCard';

function DrinksPage() {
  const { recipes, setMyPage } = useContext(MyContext);

  const LIMITER_FOODS = 12;

  useEffect(() => {
    setMyPage('thecocktaildb');
  }, [setMyPage]);

  const returnCard = (item, index) => (
    <FoodCard
      key={ index }
      index={ index }
      thumb="strDrinkThumb"
      name="strDrink"
      data={ item }
    />
  );

  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <Header title="Bebidas" search />
      <div style={ { display: 'flex', flexWrap: 'wrap' } }>
        {recipes !== null && recipes.map((item, index) => (index >= LIMITER_FOODS
          ? null : returnCard(item, index))) }
      </div>
      <Footer />
    </div>
  );
}

export default DrinksPage;
