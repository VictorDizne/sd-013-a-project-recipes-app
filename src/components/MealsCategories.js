import React, { useContext } from 'react';
import Context from '../context';
import fetchMealsFilterCategories from '../services/fetchMealsFilterCategories';

const NUM_CATEGORIES = 5;

function MealsCategories() {
  const {
    meals,
    mealsCategories,
    toggleOn, setToggleOn, setFilteredMeals } = useContext(Context);

  const filteredByCategory = async (category) => {
    const selected = category;
    if (toggleOn === selected || selected === 'All') {
      setFilteredMeals(meals);
      setToggleOn('All');
    } else {
      const results = await fetchMealsFilterCategories(category);
      setToggleOn(selected);
      setFilteredMeals(results);
    }
  };

  const handleOnClick = (category) => {
    filteredByCategory(category);
  };

  return (
    <nav>
      {mealsCategories
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

export default MealsCategories;
