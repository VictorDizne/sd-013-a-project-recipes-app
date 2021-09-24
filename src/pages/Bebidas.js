import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Card from '../components/Card';
import RecipesContext from '../context/RecipesContext';
import ButtonFilter from '../components/ButtonFilter';
import Loading from '../components/Loading';

export default function Bebidas({ history }) {
  const {
    drinks,
    handleBtnClick,
    drinksCategories,
    getDrinksCategories,
    isLoading,
    setIsLoading,
    setDrinks,
  } = useContext(RecipesContext);

  useEffect(() => {
    if (drinks.length === 1 && drinks[0].strCategory) {
      history.push(`/bebidas/${drinks[0].idDrink}`);
    }
  }, [drinks, history]);

  useEffect(() => {
    handleBtnClick({
      input: '',
      isMeal: false,
      radio: 'Nome',
    });

    getDrinksCategories('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  }, [getDrinksCategories, handleBtnClick]);

  useEffect(() => {
    if (drinks.length > 0 && drinksCategories) setIsLoading(false);
  }, [drinks, drinksCategories, setIsLoading]);

  const getDrinksByCategory = (categoryName) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then((res) => res.json())
      .then((json) => {
        const endIndex = 12;
        if (json.drinks.length > endIndex) {
          const twelveFirstDrinks = json.drinks.slice(0, endIndex);
          setDrinks(twelveFirstDrinks);
          setIsLoading(false);
        } else {
          setDrinks(json.drinks);
          setIsLoading(false);
        }
      });
  };

  return (
    <>
      <Header pageTitle="Bebidas" history={ history } isMeal={ false } />
      {
        isLoading
          ? <Loading />
          : (
            <>
              <button
                type="button"
                data-testid="All-category-filter"
                onClick={ () => {
                  handleBtnClick({
                    input: '',
                    isMeal: false,
                    radio: 'Nome',
                  });
                } }
              >
                All
              </button>
              {
                drinksCategories.map((category) => (
                  <ButtonFilter
                    key={ category.strCategory }
                    categoryName={ category.strCategory }
                    onClick={ getDrinksByCategory }
                    isMeal="drink"
                  />))
              }

              { drinks.map((drink, index) => (
                <Link
                  data-testid={ `${index}-recipe-card` }
                  to={ `/bebidas/${drink.idDrink}` }
                  key={ drink.idDrink }
                >
                  <Card
                    index={ index }
                    recipe={ drink }
                    recipeImage={ drink.strDrinkThumb }
                    recipeName={ drink.strDrink }
                  />
                </Link>
              )) }
            </>
          )
      }
      <Footer />
    </>
  );
}

Bebidas.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
