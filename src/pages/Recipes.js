import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeList from '../components/RecipeList';
import Categories from '../components/Categories';
import Context from '../context';

function Recipes({ match }) {
  const { filteredMeals } = useContext(Context);

  // `true` se for a página de comidas, `false` caso seja bebidas
  const isMeal = /comidas/.test(match.path);

  if (filteredMeals.length === 0) return <h1>Loading...</h1>;

  return (
    <>
      <Header tela={ isMeal ? 'Comidas' : 'Bebidas' } />
      <Categories isMeal={ isMeal } />
      <RecipeList isMeal={ isMeal } />
      <Footer />
    </>
  );
}

export default Recipes;
