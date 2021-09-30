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
    setMeals,
  } = useContext(RecipesContext);

  useEffect(() => {
    if (meals.length === 1 && meals[0].strCategory) {
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

  const getMealsByCategory = (categoryName) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then((res) => res.json())
      .then((json) => {
        const endIndex = 12;
        if (json.meals.length > endIndex) {
          const twelveFirstDrinks = json.meals.slice(0, endIndex);
          setMeals(twelveFirstDrinks);
          setIsLoading(false);
        } else {
          setMeals(json.meals);
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
              <div className="button-container">
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
