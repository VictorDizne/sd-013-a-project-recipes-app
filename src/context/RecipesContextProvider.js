import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import RecipesContext from './RecipesContext';

const RecipesContextProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const history = useHistory();

  const alert = () => {
    global
      .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  const fetchMeals = useCallback(({ radioIdsObj, radio }) => {
    fetch(radioIdsObj[radio])
      .then((res) => res.json())
      .then((json) => {
        const endIndex = 12;
        if (!json.meals) {
          console.log('xablau');
          return alert();
        }
        if (json.meals.length > endIndex) {
          const twelveFirstMeals = json.meals.slice(0, endIndex);
          setMeals(twelveFirstMeals);
          setIsLoading(false);
        } else {
          setMeals(json.meals);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  const fetchDrinks = useCallback(({ radioIdsObj, radio }) => {
    fetch(radioIdsObj[radio])
      .then((res) => res.json())
      .then((json) => {
        const endIndex = 12;
        if (!json.drinks) {
          console.log('xablau bebidas');
          return alert();
        }
        if (json.drinks.length > endIndex) {
          const twelveFirstDrinks = json.drinks.slice(0, endIndex);
          setDrinks(twelveFirstDrinks);
          setIsLoading(false);
        } else {
          setDrinks(json.drinks);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleBtnClick = useCallback(({ input, isMeal, radio }) => {
    const radioIdsObj = {
      Ingrediente: isMeal ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`,
      Nome: isMeal ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
        : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`,
      'Primeira Letra': isMeal ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`
        : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`,
    };

    if (radio === 'Primeira Letra' && input.length !== 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    if (isMeal) fetchMeals({ radioIdsObj, radio });
    if (!isMeal) fetchDrinks({ radioIdsObj, radio });
  }, [fetchDrinks, fetchMeals]);

  const getMealsCategories = useCallback(async (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const endIndex = 5;
        const fiveFirstCategories = json.meals.splice(0, endIndex);
        setMealsCategories(fiveFirstCategories);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const getDrinksCategories = useCallback(async (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const endIndex = 5;
        const fiveFirstCategories = json.drinks.splice(0, endIndex);
        setDrinksCategories(fiveFirstCategories);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const contextValue = {
    meals,
    setMeals,
    drinks,
    setDrinks,
    handleBtnClick,
    mealsCategories,
    drinksCategories,
    getMealsCategories,
    getDrinksCategories,
    isLoading,
    setIsLoading,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
};

export default RecipesContextProvider;

RecipesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
