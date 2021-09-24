import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        .map((drink, indexMap) => (
          <div key={ drink.idDrink } id="meals-label" className=".requisito32">
            <Link
              className=".requisito32"
              to={ `/bebidas/${drink.idDrink}` }
              data-testid={ `${indexMap}-recipe-card` }
            >
              <img
                src={ drink.strDrinkThumb }
                data-testid={ `${indexMap}-card-img` }
                alt={ drink.strMeal }
                style={ { width: '200px', height: '200px' } }
              />
            </Link>
            <p data-testid={ `${indexMap}-card-name` }>{drink.strDrink}</p>
          </div>
        )) }
      <LowerMenu />
    </div>
  );
}

export default HomeDrinks;
