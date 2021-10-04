import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Filters from '../components/Filters';
import Loading from '../components/Loading';
import MyContext from '../context/myContext';
import { cocktailsAPIRequest } from '../services/APIrequest';
import createCard from '../services/createCard';
import Footer from '../components/Footer';
import Header from '../components/Header';

const TelaBebidas = ({ history }) => {
  const {
    dataDrink,
    categoryDrink,
    categoryFilter,
    btnState,
    setCategoryFilter,
    setDataDrink,
    searchBarFilters,
  } = useContext(MyContext);

  useEffect(() => {
    const cocktailsRequest = async () => {
      const drink = await cocktailsAPIRequest();
      setDataDrink(drink);
    };
    cocktailsRequest();
  }, []);

  useEffect(() => {
    const { category } = btnState;
    const ApiCategoryDrink = async () => {
      const fetchCategoryDrink = await cocktailsAPIRequest('filter', `c=${category}`);
      setCategoryFilter(fetchCategoryDrink);
    };
    ApiCategoryDrink();
  }, [btnState]);

  const renderCards = () => {
    if (categoryFilter !== null) {
      return createCard(categoryFilter, 'Drink');
    } if (searchBarFilters.length > 1) {
      return createCard(searchBarFilters, 'Drink');
    } return createCard(dataDrink, 'Drink');
  };

  return !dataDrink ? <Loading /> : (
    <>
      <Header hasLupa pageName="Bebidas" />
      <div className="main">
        <Filters alimento={ categoryDrink } />
        { searchBarFilters.length === 1 ? history
          .push(`/bebidas/${searchBarFilters[0].idDrink}`) : renderCards() }
      </div>
      <Footer />
    </>
  );
};

TelaBebidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default TelaBebidas;
