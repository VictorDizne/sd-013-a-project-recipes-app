import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Context from '../Context/Context';
import Header from '../components/Header';
import useRecipesSearch from '../Hooks/useRecipesSearch';
import useFetchRecipes from '../Hooks/useFetchRecipes';
import Footer from '../components/Footer';

function Foods() {
  const { recipes, data, category, setId } = useContext(Context);
  const history = useHistory();
  const urlFood = 'themeal';
  const secondButton = true;
  useFetchRecipes(urlFood, 'meals');
  useRecipesSearch(data.search, data.text, urlFood);
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
        <Link
          key={ index }
          to={ `/comidas/${food.idMeal}` }
          onClick={ () => setId(food.idMeal) }
        >
          <div data-testid={ `${index}-recipe-card` }>
            <h3 data-testid={ `${index}-card-name` }>{ food.strMeal }</h3>
            <img
              src={ food.strMealThumb }
              alt={ food.strMeal }
              data-testid={ `${index}-card-img` }
            />
          </div>
        </Link>
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
  const renderButtons = () => {
    if (category.meals !== undefined) {
      const magic2 = 5;
      const list = category.meals;
      const listButton = list.slice(0, magic2);
      return listButton.map((button) => (
        <Button
          key={ button.strCategory }
          testID={ `${button.strCategory}-category-filter` }
        >
          {button.strCategory}
        </Button>
      ));
    }
  };

  return (
    <div>
      <Header text="Comidas" secondButton={ secondButton } />
      <section>
        <Button
          testID="all-category-filter"
        >
          All
        </Button>
        { category !== undefined ? renderButtons() : null}
      </section>
      <h1>Foods</h1>
      { recipes.meals !== undefined ? renderFoods() : null }
      <Footer />
    </div>
  );
}

export default Foods;
