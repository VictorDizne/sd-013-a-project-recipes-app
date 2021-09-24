import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Card from '../components/Card';
import RecipesContext from '../context/RecipesContext';
import ButtonFilter from '../components/ButtonFilter';
import Loading from '../components/Loading';

export default function Comidas({ history }) {
  const {
    meals,
    handleBtnClick,
    getMealsCategories,
    mealsCategories,
    isLoading,
    setIsLoading,
  } = useContext(RecipesContext);

  useEffect(() => {
    // if (!meals) {
    //   console.log('xablau');
    //   global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    // }
    if (meals.length === 1) {
      history.push(`/comidas/${meals[0].idMeal}`);
    }
  }, [history, meals]);

  useEffect(() => {
    handleBtnClick({
      input: '',
      isMeal: true,
      radio: 'Nome',
    });

    getMealsCategories('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  }, [getMealsCategories, handleBtnClick]);

  useEffect(() => {
    if (meals.length > 0 && mealsCategories) setIsLoading(false);
  }, [meals, mealsCategories, setIsLoading]);

  return (
    <>
      <Header pageTitle="Comidas" history={ history } isMeal />

      {
        isLoading
          ? <Loading />
          : (
            <>
              {
                mealsCategories.map((category) => (
                  <ButtonFilter
                    key={ category.strCategory }
                    categoryName={ category.strCategory }
                  />))
              }
              {
                meals.map((meal, index) => (
                  <Card
                    key={ meal.idMeal }
                    index={ index }
                    recipe={ meal }
                    recipeImage={ meal.strMealThumb }
                    recipeName={ meal.strMeal }
                  />
                ))
              }
            </>
          )
      }

      <Footer />
    </>
  );
}

Comidas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
