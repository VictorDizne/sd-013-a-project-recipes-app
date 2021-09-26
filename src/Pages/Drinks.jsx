import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipeCard from '../Components/RecipeCard';
import Context from '../ContextAPI/Context';

export default function Drinks() {
  const pageTitle = {
    pageName: 'Bebidas',
    setIcon: true,
  };

  const { data, loading } = useContext(Context);

  const history = useHistory();

  const DOZE = 12;

  const { pathname } = useLocation();

  return (
    <div>
      <Header value={ pageTitle } />
      <h1>Drinks</h1>
      {loading && data.length === 1
        ? history.push(`/bebidas/${data[0].idDrink}`)
        : data.map((recipe, index) => (
          index < DOZE && <RecipeCard
            name={ recipe.strDrink }
            img={ recipe.strDrinkThumb }
            key={ index }
            index={ index }
            id={ recipe.idDrink }
            pathName={ pathname }
          />))}
      <Footer />
    </div>
  );
}
