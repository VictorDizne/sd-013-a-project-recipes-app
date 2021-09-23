import React, { useContext } from 'react';
import Context from '../Context/Context';
import Header from '../components/Header';
import useFetchApi from '../Hooks/useFetchAPI';
import Footer from '../components/Footer';
/* import PropTypes from 'prop-types'; */

function Foods() {
  const food = 'themeal';
  const { data, recipes } = useContext(Context);
  const secondButton = true;
  useFetchApi(data.search, data.text, food);
  console.log(recipes.meals);
  return (
    <div>
      <Header text="Comidas" secondButton={ secondButton } />
      { recipes.meals === undefined ? (<h3>...loading</h3>)
        : (
          recipes.meals.map((recipe, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <h3 data-testid={ `${index}-recipe-name` }>{ recipe.strMeal }</h3>
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid={ `${index}-recipe-img` }
              />
            </div>
          )))}
      <Footer />
    </div>
  );
}

export default Foods;
