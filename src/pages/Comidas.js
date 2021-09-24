import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';
import fetchMeals from '../services/fetchMeals';
import fetchMealsCategories from '../services/fetchMealsCategories';
import fetchMealsFilterCategories from '../services/fetchMealsFilterCategories';

const NUM_MEALS = 12;
const NUM_FIVE = 5;

function Comidas() {
  const { meals, setMeals, mealsCategories, setMealsCategories,
    setFilteredMeals, filteredMeals } = useContext(Context);

  const [isLoading, setIsLoading] = useState(true);
  const [toggleOn, setToggleOn] = useState('');

  useEffect(() => {
    const getMeals = async () => {
      const results = await fetchMeals();
      setMeals(results);
      setFilteredMeals(results);
    };
    getMeals();
    const getMealsCategories = async () => {
      const results = await fetchMealsCategories();
      setMealsCategories(results);
    };
    getMealsCategories();
    setIsLoading(false);
  }, [setMeals, setMealsCategories, setFilteredMeals]);

  if (isLoading) return <h1>Loading...</h1>;

  const filteredByCategory = async (category) => {
    const selected = category;
    if (toggleOn === selected || selected === 'All') {
      setFilteredMeals(meals);
      setToggleOn('All');
    } else {
      const results = await fetchMealsFilterCategories(category);
      setToggleOn(selected);
      setFilteredMeals(results);
    }
  };

  const handleOnClick = (category) => {
    filteredByCategory(category);
  };

  return (
    <>
      <nav>
        {mealsCategories.filter((cat, idx) => idx < NUM_FIVE).map(({ strCategory }) => (
          <button
            key={ strCategory }
            type="button"
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => handleOnClick(strCategory) }
          >
            {strCategory}
          </button>
        ))}
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => handleOnClick('All') }
        >
          All
        </button>
      </nav>
      <Header />
      <h1>Comidas</h1>

      {filteredMeals.filter((meal, idx) => idx < NUM_MEALS).map((meal, idx) => (
        <Link key={ meal.idMeal } to={ `/comidas/${meal.idMeal}` }>
          <section key={ meal.strMeal } data-testid={ `${idx}-recipe-card` }>
            <h2 data-testid={ `${idx}-card-name` }>{meal.strMeal}</h2>
            <img
              src={ meal.strMealThumb }
              data-testid={ `${idx}-card-img` }
              alt={ meal.strMeal }
            />
          </section>
        </Link>
      ))}
      <Footer />
    </>
  );
}

export default Comidas;
