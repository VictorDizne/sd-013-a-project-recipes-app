import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipeCard from '../Components/RecipeCard';
import Context from '../ContextAPI/Context';

export default function FoodsByLocal() {
  const pageTitle = {
    pageName: 'Explorar Origem',
    setIcon: true,
  };

  const DOZE = 12;

  const { pathname } = useLocation();
  const pathnameCheck = (pathName) => {
    switch (pathName) {
    case '/explorar/comidas/area':
      return 'themealdb';
    default:
      return null;
    }
  };

  const {
    searchData,
    loadingExplore,
    fetchAPI,
    fetchAreas,
    fetchByArea,
    areas,
    areaData,
    setSearchData,
  } = useContext(Context);

  useEffect(() => {
    // Requisição inicial para renderizar cards ao carregar a página.
    fetchAreas();
    const verifyStates = () => {
      if (areaData.length >= 1) {
        setSearchData(areaData);
      } else {
        fetchAPI(pathnameCheck(pathname));
      }
    };
    verifyStates();
  }, [areaData]);

  const handleChange = (event) => {
    fetchByArea(event.target.value);
  };

  return (
    <div>
      <Header value={ pageTitle } />
      <h2>FOODS LOCAL</h2>
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ (event) => handleChange(event) }
      >
        <option data-testid="All-option">All</option>
        {areas.map((area, index) => (
          <option
            key={ index }
            data-testid={ `${area.strArea}-option` }
          >
            { area.strArea }
          </option>
        ))}
      </select>
      {(loadingExplore && searchData.length > 1)
      && searchData.map((recipe, index) => (
        index < DOZE && <RecipeCard
          name={ recipe.strMeal }
          img={ recipe.strMealThumb }
          key={ index }
          index={ index }
          id={ recipe.idMeal }
          pathName="/comidas"
        />))}

      <Footer />
    </div>
  );
}
