import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import MyContext from '../context/myContext';
import createCard from '../services/createCard';
import Filters from '../components/Filters';
import Loading from '../components/Loading';
import { foodAPIRequest } from '../services/APIrequest';
import Footer from '../components/Footer';
import Header from '../components/Header';

const TelaComidas = ({ history }) => {
  const {
    dataFood,
    categoryFood,
    categoryFilter,
    setCategoryFilter,
    btnState,
    setDataFood,
    searchBarFilters,
    shouldRedirect,
    idUnico,
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
    } if (searchBarFilters.length > 1) {
      return createCard(searchBarFilters, 'Meal');
    } return createCard(dataFood, 'Meal');
  };

  return dataFood.length === 0 ? <Loading /> : (
    <div>
      <Header hasLupa pageName="Comidas" />
      <div className="main">
        <Filters alimento={ categoryFood } />
        {searchBarFilters.length === 1 ? {
      const id = searchBarFilters[0].idMeal;
      history.push(`/comidas/${id}`);}
        { renderCards() }
      </div>
      <Footer />
    </div>
  );
};

TelaComidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default TelaComidas;
