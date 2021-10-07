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

  const {
    searchData,
    setSearchData,
    exploreData,
    loading,
    pathnameCheck,
    fetchAPI,
  } = useContext(Context);

  const DOZE = 12;

  const { pathname } = useLocation();

  useEffect(() => {
    // Requisição inicial para renderizar cards ao carregar a página.
    const verifyStates = () => {
      if (exploreData.length >= 1) {
        setSearchData(exploreData);
      } else {
        fetchAPI(pathnameCheck(pathname));
      }
    };
    verifyStates();
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
