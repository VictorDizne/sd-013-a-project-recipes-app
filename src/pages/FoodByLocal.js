import React, { useEffect, useState } from 'react';
import { fetchAreas, fetchFoodsByArea } from '../services/comidasApi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealCard from '../components/MealCard';
import '../styles/ExplorePages.css';

const MAX_RECIPES = 12;

const FoodByLocal = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [meals, setMeals] = useState([]);

  const getCountries = async () => {
    const countries = await fetchAreas();
    setAreas(countries);
    setSelectedArea(countries[0].strArea);
  };

  const getMeals = async () => {
    const mealsList = await fetchFoodsByArea(selectedArea);
    setMeals(mealsList);
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    getMeals();
  }, [selectedArea]);

  const handleChange = ({ target }) => {
    setSelectedArea(target.value);
  };

  return (
    <div>
      <Header title="Explorar Origem" hasSearchIcon />

      <div className="container">
        <select onChange={ handleChange } data-testid="explore-by-area-dropdown">
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
