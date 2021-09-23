import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Card from '../components/Card';
import RecipesContext from '../context/RecipesContext';
import ButtonFilter from '../components/ButtonFilter';

export default function Bebidas({ history }) {
  const {
    drinks,
    handleBtnClick,
    drinksCategories,
    getDrinksCategories,
  } = useContext(RecipesContext);

  useEffect(() => {
    if (!drinks) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (drinks.length === 1) history.push(`/bebidas/${drinks[0].idDrink}`);
  }, [drinks, history]);

  useEffect(() => {
    handleBtnClick({
      input: '',
      isMeal: false,
      radio: 'Nome',
    });

    // getDrinksCategories('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  }, [getDrinksCategories, handleBtnClick]);

  return (
    <>
      <Header pageTitle="Bebidas" history={ history } isMeal={ false } />
      {
        drinksCategories && drinksCategories.map((category) => (
          <ButtonFilter
            key={ category.strCategory }
            categoryName={ category.strCategory }
          />))
      }

      { drinks.map((drink, index) => (
        <Card
          key={ drink.idMeal }
          index={ index }
          recipe={ drink }
          recipeImage={ drink.strDrinkThumb }
          recipeName={ drink.strDrink }
        />
      ))}
      <Footer />
    </>
  );
}

Bebidas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
