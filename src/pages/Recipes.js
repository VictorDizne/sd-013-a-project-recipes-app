import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeList from '../components/RecipeList';
import Categories from '../components/Categories';
import Context from '../context';

function Recipes({ match }) {
  const { filteredMeals, filteredDrinks } = useContext(Context);

  // `true` se for a página de comidas, `false` caso seja bebidas
  const isMeal = /comidas/.test(match.path);

  const renderContent = () => {
    if (!filteredMeals || !filteredDrinks) return <h1>Loading...</h1>;

    return (
      <>
        <Categories isMeal={ isMeal } />
        <RecipeList isMeal={ isMeal } />
      </>);
  };

  return (
    <>
      <Header tela={ isMeal ? 'Comidas' : 'Bebidas' } />
      {renderContent()}
      <Footer />
    </>
  );
}

Recipes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Recipes;
