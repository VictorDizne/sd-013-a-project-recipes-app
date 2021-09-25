import React, { useContext, useEffect } from 'react';
import MyContext from '../context/myContext';
import createCard from '../services/createCard';
import Filters from '../components/Filters';
import Loading from '../components/Loading';
import { foodAPIRequest } from '../services/APIrequest';
import Footer from '../components/Footer';
import Header from '../components/Header';

const TelaComidas = () => {
  const {
    dataFood,
    categoryFood,
    categoryFilter,
    setCategoryFilter,
    btnState,
    setDataFood,
  } = useContext(MyContext);

  useEffect(() => {
    const foodRequest = async () => {
      const food = await foodAPIRequest();
      setDataFood(food);
    };
    foodRequest();
  }, []);

  useEffect(() => {
    const { category } = btnState;
    const ApiCategoryFood = async () => {
      const fetchCategoryFood = await foodAPIRequest('filter', `c=${category}`);
      setCategoryFilter(fetchCategoryFood);
    };
    ApiCategoryFood();
  }, [btnState]);

  return dataFood.length === 0 ? <Loading /> : (
    <>
      <Header hasLupa pageName="Comidas" />
      <div className="main">
        <Filters alimento={ categoryFood } />
        { categoryFilter === null ? createCard(dataFood, 'Meal')
          : createCard(categoryFilter, 'Meal') }
      </div>
      <Footer />
    </>
  );
};

export default TelaComidas;
