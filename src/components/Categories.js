import React, { useContext } from 'react';
import Context from '../context';
import fetchRecipesByCategories from '../services/fetchRecipesByCategories';

const NUM_CATEGORIES = 5;

function Categories({ isMeal }) {
  const {
    meals,
    mealsCategories,
    drinks,
    drinksCategories,
    toggleOn, setToggleOn,
    setFilteredMeals,
    setFilteredDrinks,
  } = useContext(Context);

  const filteredByCategory = async (category) => {
    const selected = category;
    if (toggleOn === selected || selected === 'All') {
      if (isMeal) {
        setFilteredMeals(meals);
      } else {
        setFilteredDrinks(drinks);
      }
      setToggleOn('All');
    } else {
      const results = await fetchRecipesByCategories(category, isMeal);
      setToggleOn(selected);
      setFilteredMeals(results);
    }
  };

  const handleOnClick = (category) => {
    filteredByCategory(category);
  };

  const categories = isMeal ? mealsCategories : drinksCategories;

  return (
    <nav>
      {categories
        .filter((_cat, idx) => idx < NUM_CATEGORIES)
        .map(({ strCategory }) => (
          <button
            key={ strCategory }
            type="button"
            onClick={ () => handleOnClick(strCategory) }
            data-testid={ `${strCategory}-category-filter` }
          >
            {strCategory}
          </button>
        ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleOnClick('All') }
      >
        All
      </button>
    </nav>
  );
}

export default Categories;
