import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Card from '../components/Card';
import RecipesContext from '../context/RecipesContext';
import ButtonFilter from '../components/ButtonFilter';

export default function Comidas({ history }) {
  const {
    meals,
    handleBtnClick,
    getMealsCategories,
    mealsCategories,
  } = useContext(RecipesContext);

  useEffect(() => {
    if (!meals) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (meals.length === 1) history.push(`/comidas/${meals[0].idMeal}`);
  }, [meals, history]);

  useEffect(() => {
    handleBtnClick({
      input: '',
      isMeal: true,
      radio: 'Nome',
    });

    // getMealsCategories('https://www.themealdb.com/api/json/v1/1/categories.php');
  }, [getMealsCategories, handleBtnClick]);

  return (
    <>
      <Header pageTitle="Comidas" history={ history } isMeal />
      {
        mealsCategories && mealsCategories.map((category) => (
          <ButtonFilter
            key={ category.idCategory }
            categoryName={ category.strCategory }
          />))
      }
      { meals.map((meal, index) => (
        <Card
          key={ meal.idMeal }
          index={ index }
          recipe={ meal }
          recipeImage={ meal.strMealThumb }
          recipeName={ meal.strMeal }
        />
      )) }

      <Footer />
    </>
  );
}

Comidas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
