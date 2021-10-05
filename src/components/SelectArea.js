import React, { useState, useEffect, useRef } from 'react';
import { fetchIAreas, fetchIAreaMeals } from '../services';
import ReciperCard from './RecipeCard';

const MAX_INDEX = 12;

function SelectArea() {
  const [Area, setArea] = useState('American');
  const [nameAreas, setNameAreas] = useState([]);
  const [listMeals, setListMeals] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const initialRender = useRef(false);

  function handleClick({ target }) {
    setArea(target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchIAreas();
      setNameAreas([...data, { strArea: 'All' }]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchIAreaMeals(Area);
      setListMeals(data);
    };
    fetchData();
  }, [Area]);

  useEffect(() => {
    if (initialRender.current) {
      setIsReady(true);
    } else {
      initialRender.current = true;
    }
  }, [listMeals]);

  return (
    <>
      <label htmlFor="membership">
        Selecione a origem:
        <select
          name="membership"
          id="membership"
          data-testid="explore-by-area-dropdown"
          onChange={ handleClick }
        >
          {nameAreas.map((country) => (
            <option
              key={ country.strArea }
              data-testid={ `${country.strArea}-option` }
              value={ country.strArea }
            >
              {country.strArea}
            </option>
          ))}
        </select>
      </label>
      {isReady && listMeals.slice(0, MAX_INDEX).map((recipe, index) => (
        <ReciperCard
          key={ recipe.idMeal }
          idRecipe={ recipe.idMeal }
          index={ index }
          name={ recipe.strMeal }
          img={ recipe.strMealThumb }
        />))}
    </>
  );
}

export default SelectArea;
