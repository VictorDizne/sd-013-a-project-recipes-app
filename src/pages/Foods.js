import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import Context from '../Context/Context';
import Header from '../components/Header';
import useFetchApi from '../Hooks/useFetchAPI';
import Footer from '../components/Footer';

function Foods() {
  const { recipes, data } = useContext(Context);
  const history = useHistory();
  const urlFood = 'themeal';
  const secondButton = true;
  useFetchApi(data.search, data.text, urlFood);
  const renderFoods = () => {
    const magic = 12;
    if (recipes.meals === null) {
      return (
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
      );
    }
    if (recipes.meals.length === 1) {
      const id = recipes.meals[0].idMeal;
      return history.push(`./comidas/${id}`);
    }
    if (recipes.meals.length > magic) {
      const foods = recipes.meals.slice(0, magic);
      return foods.map((food, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <h3 data-testid={ `${index}-card-name` }>{ food.strMeal }</h3>
          <img
            src={ food.strMealThumb }
            alt={ food.strMeal }
            data-testid={ `${index}-card-img` }
          />
        </div>
      ));
    }
    return (
      recipes.meals.map((recipe, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <h3 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h3>
          <img
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            data-testid={ `${index}-card-img` }
          />
        </div>
      ))
    );
  };
  return (
    <div>
      <Header text="Comidas" secondButton={ secondButton } />
      { recipes.meals !== undefined ? renderFoods() : null }
      <Footer />
    </div>
  );
}

export default Foods;
