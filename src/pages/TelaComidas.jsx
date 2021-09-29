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
    searchBarFilters,
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

  const renderCards = () => {
    if (categoryFilter !== null) {
      return createCard(categoryFilter, 'Meal');
    } if (searchBarFilters.length !== 0) {
      return createCard(searchBarFilters, 'Meal');
    } return createCard(dataFood, 'Meal');
  };

  return dataFood.length === 0 ? <Loading /> : (
    <div>
      <Header hasLupa pageName="Comidas" />
      <div className="main">
        <Filters alimento={ categoryFood } />
        { renderCards() }
      </div>
      <Footer />
    </div>
  );
};

export default TelaComidas;
