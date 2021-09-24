import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import Context from '../Context/Context';
import useRecipesSearch from '../Hooks/useRecipesSearch';
import useFetchRecipes from '../Hooks/useFetchRecipes';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  const urlDrink = 'thecocktail';
  const { data, recipes } = useContext(Context);
  const history = useHistory();
  const secondButton = true;
  useFetchRecipes(urlDrink);
  useRecipesSearch(data.search, data.text, urlDrink);
  const renderDrinks = () => {
    const magic = 12;
    if (recipes.drinks === null) {
      return (
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
      );
    }
    if (recipes.drinks.length === 1) {
      const id = recipes.drinks[0].idDrink;
      return history.push(`./bebidas/${id}`);
    }
    if (recipes.drinks.length > magic) {
      const cooktail = recipes.drinks.slice(0, magic);
      return cooktail.map((recipe, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <h3 data-testid={ `${index}-card-name` }>{ recipe.strDrink }</h3>
          <img
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
            data-testid={ `${index}-card-img` }
          />
        </div>
      ));
    }
    return (
      recipes.drinks.map((drink, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <h3 data-testid={ `${index}-card-name` }>{ drink.strMeal }</h3>
          <img
            src={ drink.strMealThumb }
            alt={ drink.strMeal }
            data-testid={ `${index}-card-img` }
          />
        </div>
      ))
    );
  };
  return (
    <section>
      <Header text="Bebidas" secondButton={ secondButton } />
      <h1>Drinks</h1>
      { recipes.drinks !== undefined ? renderDrinks() : null }
      <Footer />
    </section>
  );
}

export default Drinks;
