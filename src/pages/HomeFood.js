import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchByName } from '../services/fetchs';
import appContext from '../contexts/appContext';
import Header from '../components/header';
import LowerMenu from '../components/LowerMenu';
import SearchFoodCategories from '../components/searchFoodCategories';

const HomeFood = () => {
  const { state, setState, state: { foods, key } } = useContext(appContext);
  const MAX_FOODS = 12;

  useEffect(() => {
    if (!key) {
      const fetchData = async () => {
        const defaultMeals = await fetchByName('themealdb', '');
        setState({ ...state, foods: [...defaultMeals] });
      };
      fetchData();
    }
  }, []);

  return (
    <div>
      <Header name="Comidas" search />
      Home Food
      <SearchFoodCategories />
      { foods
        .filter((food, index) => index < MAX_FOODS)
        .map((food, index) => (
          <Link
            key={ food.idMeal }
            to={ `/comidas/${food.idMeal}` }
            data-testid={ `${index}-recipe-card` }
          >
            <div id="meals-label" className={ { width: 240 } }>
              <img
                src={ food.strMealThumb }
                data-testid={ `${index}-card-img` }
                alt={ food.strMeal }
              />
              <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
            </div>
          </Link>
        )) }
      <LowerMenu />
    </div>
  );
};

export default HomeFood;
