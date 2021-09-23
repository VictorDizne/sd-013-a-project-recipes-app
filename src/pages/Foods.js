import React, { useContext, useHistory } from 'react';
import Context from '../Context/Context';
import Header from '../components/Header';
import useFetchApi from '../Hooks/useFetchAPI';
import Footer from '../components/Footer';
/* import PropTypes from 'prop-types'; */

const renderFoods = () => {
  const { recipes: { meals }, setIdFood } = useContext(Context);
  const history = useHistory();

  if (meals.length === 1) {
    setIdFood(meals[0].idMeal);

  };


}

function Foods() {
  const food = 'themeal';
  const { data } = useContext(Context);
  const secondButton = true;
  useFetchApi(data.search, data.text, food);
  console.log(recipes.meals);
  return (
    <div>
      <Header text="Comidas" secondButton={ secondButton } />
      { recipes.meals === undefined ? null
        : (
          recipes.meals.map((recipe, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <h3 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h3>
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid={ `${index}-card-img` }
              />
            </div>
          )))}
      <Footer />
    </div>
  );
}

export default Foods;
