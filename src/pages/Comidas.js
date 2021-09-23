import React, { useEffect, useContext, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';
import fetchMeals from '../services/fetchMeals';
import fetchMealsCategories from '../services/fetchMealsCategories';

const NUM_MEALS = 12;

function Comidas() {
  const { meals, setMeals, mealsCategories, setMealsCategories } = useContext(Context);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMeals = async () => {
      const results = await fetchMeals();
      setMeals(results);
    };
    getMeals();
    const getMealsCategories = async () => {
      const results = await fetchMealsCategories();
      setMealsCategories(results);
    };
    getMealsCategories();
    setIsLoading(false);
  }, [setMeals, setMealsCategories]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <nav>
        {mealsCategories.filter((cat, idx) => idx < 5).map(({ strCategory }) => (
          <button
            key={ strCategory }
            type="button"
            data-testid={ `${strCategory}-category-filter` }
          >
            {strCategory}
          </button>
        ))}
      </nav>
      <Header />
      <h1>Comidas</h1>

      {meals.filter((meal, idx) => idx < NUM_MEALS).map((meal, idx) => (
        <section key={ meal.strMeal } data-testid={ `${idx}-recipe-card` }>
          <h2 data-testid={ `${idx}-card-name` }>{meal.strMeal}</h2>
          <img
            src={ meal.strMealThumb }
            data-testid={ `${idx}-card-img` }
            alt={ meal.strMeal }
          />
        </section>
      ))}
      <Footer />
    </>
  );
}

export default Comidas;
