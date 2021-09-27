import React, { useEffect, useContext, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context';
import fetchMeals from '../services/fetchMeals';
import fetchMealsCategories from '../services/fetchMealsCategories';
import MealsList from '../components/MealsList';
import MealsCategories from '../components/MealsCategories';

function Comidas() {
  const { setMeals, setMealsCategories, setFilteredMeals } = useContext(Context);

  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      <Header tela="Comidas" />
      {
        isLoading
          ? <h1>Loading...</h1>
          : (
            <div>
              <MealsCategories />
              <MealsList />
              <Footer />
            </div>
          )
      }
    </>
  );
}

export default Comidas;
