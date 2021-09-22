import React, { useContext, useEffect } from 'react';
import { fetchByName } from '../services/fetchs';
import appContext from '../contexts/appContext';
import Header from '../components/header';
import LowerMenu from '../components/LowerMenu';

const HomeFood = () => {
  const { state, setState, state: { foods } } = useContext(appContext);
  const MAX_FOODS = 12;

  useEffect(() => {
    const fetchData = async () => {
      const defaultMeals = await fetchByName('themealdb', '');
      setState({ ...state, foods: [...defaultMeals] });
    };
    fetchData();
  }, [setState, state]);

  return (
    <div>
      <Header name="Comidas" search />
      Home Food
      { foods
        .filter((food, index) => index < MAX_FOODS)
        .map((food, index) => (
          <div key={ food.idMeal } data-testid={ `${index}-recipe-card` }>
            <img
              src={ food.strMealThumb }
              data-testid={ `${index}-card-img` }
              alt={ food.strMeal }
            />
            <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
          </div>
        )) }
      <LowerMenu />
    </div>
  );
};

export default HomeFood;
