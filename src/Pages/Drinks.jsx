import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipeCard from '../Components/RecipeCard';
import Buttons from '../Components/Buttons';
import Context from '../ContextAPI/Context';

export default function Drinks() {
  const pageTitle = {
    pageName: 'Bebidas',
    setIcon: true,
  };

  const history = useHistory();

  const { searchData, pathnameCheck, fetchAPI, loading } = useContext(Context);

  const DOZE = 12;

  const { pathname } = useLocation();

  useEffect(() => {
    // Requisição inicial para renderizar cards ao carregar a página.
    // const fetchAPI = async () => {
    //   const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    //   const json = await result.json();
    //   setSearchData(json.drinks.slice(0, DOZE));
    // };
    fetchAPI(pathnameCheck());
  }, []);

  return (
    <div>
      <Header value={ pageTitle } />
      <h1>Drinks</h1>
      <Buttons />

      {loading && searchData.length === 1
        ? history.push(`/bebidas/${searchData[0].idDrink}`)
        : searchData.map((recipe, index) => (
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
