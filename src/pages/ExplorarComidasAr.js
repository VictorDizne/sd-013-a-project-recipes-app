import React, { useContext, useEffect, useState } from 'react';
import AreaCard from '../components/areaCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import appContext from '../redux/appcontext';

const ExplorarComidasAr = () => {
  const [areaMeals, setAreaMeals] = useState([]);
  const [selectValue, setSelectValue] = useState([]);
  const { setArea, setPageAreas, mealsApi } = useContext(appContext);

  async function areaAPI() {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const result = await fetch(endpoint).then((res) => res.json());
    setAreaMeals(result.meals);
  }

  async function filterAreaAPI(value) {
    if (value !== 'All') {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;
      const result = await fetch(endpoint).then((res) => res.json());
      const slicedResult = result.meals.slice(0, Number('12'));
      setArea(slicedResult);
      setPageAreas(true);
    } else {
      setArea(mealsApi);
    }
  }

  const handleChange = async ({ target }) => {
    const { value } = target;
    filterAreaAPI(value);
    setSelectValue(value);
  };

  useEffect(() => {
    areaAPI();
  }, []);

  return (
    <div>
      <Header page="Explorar Origem" />
      <select data-testid="explore-by-area-dropdown" onChange={ handleChange }>
        <option data-testid="All-option"> All</option>
        {areaMeals
          .map((local, index) => (
            <option
              key={ index }
              data-testid={ `${local.strArea}-option` }
            >
              { local.strArea }
            </option>))}
      </select>
      <AreaCard value={ selectValue } />
      <Footer />
    </div>
  );
};

export default ExplorarComidasAr;
