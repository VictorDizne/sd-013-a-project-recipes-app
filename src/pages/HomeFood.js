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
        .map((food, indexMap) => (
          <div key={ food.idMeal } id="meals-label" className=".requisito32">
            <Link
              className=".requisito32"
              to={ `/comidas/${food.idMeal}` }
              data-testid={ `${indexMap}-recipe-card` }
            >
              <img
                src={ food.strMealThumb }
                data-testid={ `${indexMap}-card-img` }
                alt={ food.strMeal }
                style={ { width: '200px', height: '200px' } }
              />
            </Link>
            <p data-testid={ `${indexMap}-card-name` }>{food.strMeal}</p>
          </div>
        )) }
      <LowerMenu />
    </div>
  );
};

export default HomeFood;
