import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RecipeCard from '../Components/RecipeCard';
import Context from '../ContextAPI/Context';

export default function Foods() {
  const pageTitle = {
    pageName: 'Comidas',
    setIcon: true,
  };

  const history = useHistory();

  const { data, loading } = useContext(Context);

  const DOZE = 12;

  const { pathname } = useLocation();

  return (
    <div>
      <Header value={ pageTitle } />
      <h1>Foods</h1>
      {loading && data.length === 1
        ? history.push(`/comidas/${data[0].idMeal}`)
        : data.map((recipe, index) => (
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
