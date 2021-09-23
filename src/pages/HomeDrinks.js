import React, { useContext, useEffect } from 'react';
import { fetchByName } from '../services/fetchs';
import appContext from '../contexts/appContext';
import Header from '../components/header';
import LowerMenu from '../components/LowerMenu';
import SearchDrinkCategories from '../components/searchDrinkCategories';

function HomeDrinks() {
  const { state, setState, state: { drinks } } = useContext(appContext);

  const MAX_DRINKS = 12;
  useEffect(() => {
    const fetchData = async () => {
      const defaultDrinks = await fetchByName('thecocktaildb', '');
      setState({ ...state, drinks: [...defaultDrinks] });
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header name="Bebidas" search />
      Home Drinks
      <SearchDrinkCategories />
      { drinks
        .filter((drink, index) => index < MAX_DRINKS)
        .map((drink, index) => (
          <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
            <img
              src={ drink.strDrinkThumb }
              data-testid={ `${index}-card-img` }
              alt={ drink.strDrink }
            />
            <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
          </div>
        )) }
      <LowerMenu />
    </div>
  );
}

export default HomeDrinks;
