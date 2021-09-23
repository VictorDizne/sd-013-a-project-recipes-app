import React, { useContext } from 'react';
import Context from '../Context/Context';
import useFetchApi from '../Hooks/useFetchAPI';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  const drink = 'thecocktail';
  const { data, recipes } = useContext(Context);
  const secondButton = true;
  useFetchApi(data.search, data.text, drink);
  console.log(recipes.drinks);
  return (
    <section>
      <Header text="Bebidas" secondButton={ secondButton } />
      <h1>Drinks</h1>
      { recipes.drinks === undefined ? (<h3>...loading</h3>)
        : (
          recipes.drinks.map((recipe, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <h3 data-testid={ `${index}-recipe-name` }>{ recipe.strDrink }</h3>
              <img
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
                data-testid={ `${index}-recipe-img` }
              />
            </div>
          )))}
      <Footer />
    </section>
  );
}

export default Drinks;
