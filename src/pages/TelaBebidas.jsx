import React, { useContext, useEffect } from 'react';
import Filters from '../components/Filters';
import Loading from '../components/Loading';
import MyContext from '../context/myContext';
import { cocktailsAPIRequest } from '../services/APIrequest';
import createCard from '../services/createCard';
import Footer from '../components/Footer';
import Header from '../components/Header';

const TelaBebidas = () => {
  const {
    dataDrink,
    categoryDrink,
    categoryFilter,
    btnState,
    setCategoryFilter,
    setDataDrink,
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

  return !dataDrink ? <Loading /> : (
    <>
      <Header hasLupa pageName="Bebidas" />
      <div className="main">
        <Filters alimento={ categoryDrink } />
        { !categoryFilter ? createCard(dataDrink, 'Drink')
          : createCard(categoryFilter, 'Drink') }
      </div>
      <Footer />
    </>
  );
};

export default TelaBebidas;
