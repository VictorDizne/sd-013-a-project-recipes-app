import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Card from '../../components/Card';
import RecipesContext from '../../context/RecipesContext';
import ButtonFilter from '../../components/ButtonFilter';
import Loading from '../../components/Loading';

import style from './comidas.module.scss';
import calculateNumberIngredients from '../../utils/calculateNumberIngredients';

export default function Comidas({ history }) {
  const {
    meals,
    handleBtnClick,
    getMealsCategories,
    mealsCategories,
    isLoading,
    setIsLoading,
    setMeals,
  } = useContext(RecipesContext);

  useEffect(() => {
    if (meals.length === 1 && meals[0].strCategory) {
      history.push(`/comidas/${meals[0].idMeal}`);
    }
  }, [history, meals]);

  useEffect(() => {
    getMealsCategories('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  }, [getMealsCategories]);

  useEffect(() => {
    if (meals.length > 0 && mealsCategories) setIsLoading(false);
  }, [meals, mealsCategories, setIsLoading]);

  const getMealsByCategory = (categoryName) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then((res) => res.json())
      .then((json) => {
        const endIndex = 12;
        if (json.meals.length > endIndex) {
          const twelveFirstMeals = json.meals.slice(0, endIndex);
          const withNumberOfIngredients = calculateNumberIngredients(twelveFirstMeals);
          setMeals(withNumberOfIngredients);
          setIsLoading(false);
        } else {
          const withNumberOfIngredients = calculateNumberIngredients(json.meals);
          setMeals(withNumberOfIngredients);
          setIsLoading(false);
        }
      });
  };

  return (
    <>
      <Header pageTitle="Comidas" history={ history } isMeal />

      {
        isLoading
          ? <Loading />
          : (
            <>
              <div className={ style.filters }>
                <ButtonFilter
                  categoryName="All"
                  onClick={ () => {
                    handleBtnClick({
                      input: '',
                      isMeal: true,
                      radio: 'Nome',
                    });
                  } }
                  isMeal="meal"
                >
                  All
                </ButtonFilter>
                {
                  mealsCategories.map((category) => (
                    <ButtonFilter
                      key={ category.strCategory }
                      categoryName={ category.strCategory }
                      onClick={ getMealsByCategory }
                      isMeal="meal"
                    />))
                }
              </div>
              {
                meals.map((meal, index) => (
                  <Card
                    key={ meal.idMeal }
                    index={ index }
                    recipe={ meal }
                    recipeImage={ meal.strMealThumb }
                    recipeName={ meal.strMeal }
                    link={ `/comidas/${meal.idMeal}` }
                    ingredientsNumber={ meal.numberIngredients }
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
