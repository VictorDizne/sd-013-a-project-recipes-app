import React, { useContext } from 'react';
import Context from '../context';
import fetchDrinksFilterCategories from '../services/fetchDrinksFilterCategories';

const NUM_CATEGORIES = 5;

function DrinksCategories() {
  const {
    drinks,
    drinksCategories,
    toggleOn, setToggleOn, setFilteredDrinks } = useContext(Context);

  const filteredByCategory = async (category) => {
    const selected = category;
    if (toggleOn === selected || selected === 'All') {
      setFilteredDrinks(drinks);
      setToggleOn('All');
    } else {
      const results = await fetchDrinksFilterCategories(category);
      setToggleOn(selected);
      setFilteredDrinks(results);
    }
  };

  const handleOnClick = (category) => {
    filteredByCategory(category);
  };

  return (
    <nav>
      {drinksCategories
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

export default DrinksCategories;
