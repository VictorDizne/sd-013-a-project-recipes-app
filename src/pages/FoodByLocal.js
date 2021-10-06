import React, { useEffect, useState } from 'react';
import { fetchAreas, fetchFoodsByArea, fetchFoodOnLoad } from '../services/comidasApi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealCard from '../components/MealCard';
import '../styles/ExplorePages.css';

const MAX_RECIPES = 12;

const FoodByLocal = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('All');
  const [meals, setMeals] = useState([]);

  const getCountries = async () => {
    const countries = await fetchAreas();
    setAreas(countries);
  };

  const getMeals = async () => {
    if (selectedArea !== 'All') {
      const mealsList = await fetchFoodsByArea(selectedArea);
      setMeals(mealsList);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const results = await fetchFoodOnLoad();
      setMeals(results);
    };
    getData();
    getCountries();
  }, []);

  useEffect(() => {
    getMeals();
  }, [selectedArea]);

  const handleChange = async ({ target }) => {
    if (target.value === 'All') {
      const results = await fetchFoodOnLoad();
      setMeals(results);
    }
    setSelectedArea(target.value);
  };

  return (
    <div>
      <Header title="Explorar Origem" hasSearchIcon />

      <div className="container">
        <select onChange={ handleChange } data-testid="explore-by-area-dropdown">
          <option defaultValue="All" data-testid="All-option">All</option>
          { areas.map((area, index) => (
            <option
              key={ index }
              value={ area.strArea }
              data-testid={ `${area.strArea}-option` }
            >
              { area.strArea }
            </option>
          )) }
        </select>

        <div>
          { meals && meals.slice(0, MAX_RECIPES).map((meal, index) => (
            <MealCard key={ index } recipe={ meal } index={ index } />)) }
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FoodByLocal;
