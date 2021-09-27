import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RecipeCard from '../Components/RecipeCard';
import Buttons from '../Components/Buttons';
import Context from '../ContextAPI/Context';

export default function Foods() {
  const pageTitle = {
    pageName: 'Comidas',
    setIcon: true,
  };

  const history = useHistory();

  const { searchData, loading } = useContext(Context);

  const [fetchMeals, setFetchMeals] = useState([]);

  const DOZE = 12;

  const { pathname } = useLocation();

  useEffect(() => {
    const fetchAPI = async () => {
      const result = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const json = await result.json();
      setFetchMeals(json.meals.slice(0, DOZE));
    };
    fetchAPI();
  }, []);

  return (
    <div>
      <Header value={ pageTitle } />
      <h1>Foods</h1>
      <Buttons />

      {fetchMeals.map((recipe, index) => (
        <RecipeCard
          name={ recipe.strMeal }
          img={ recipe.strMealThumb }
          key={ index }
          index={ index }
          id={ recipe.idMeal }
          pathName={ pathname }
        />))}

      {loading && searchData.length === 1
        ? history.push(`/comidas/${searchData[0].idMeal}`)
        : searchData.map((recipe, index) => (
          index < DOZE && <RecipeCard
            name={ recipe.strMeal }
            img={ recipe.strMealThumb }
            key={ index }
            index={ index }
            id={ recipe.idMeal }
            pathName={ pathname }
          />))}
      <Footer />
    </div>
  );
}
