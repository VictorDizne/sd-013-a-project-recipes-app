import React, { useState, useEffect, useContext } from 'react';
import appContext from '../redux/appcontext';

const FilterDrinksCategory = () => {
  const [filters, setFilters] = useState([]);
  const { saveFilteredItens } = useContext(appContext);
  // const [trueOrFalse, setTrueOrFalse] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const filtersSlice = filters.slice(Number('0'), Number('5'));
  useEffect(() => {
    async function fecthFilters() {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const { drinks } = await fetch(endpoint).then((res) => res.json());
      setFilters(drinks);
    }
    fecthFilters();
  }, []);
  async function handleClick({ target: { value } }) {
    // selectedCategory = !selectedCategory;
    console.log(selectedCategory);
    if (selectedCategory === value) {
      setSelectedCategory('');
      saveFilteredItens([]);
    } else {
      setSelectedCategory(value);
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`;
      const result = await fetch(endpoint).then((res) => res.json());
      const slicedResult = result.drinks.slice(0, Number('12'));
      saveFilteredItens(slicedResult);
    }
  }

  function handleAllClick() {
    setSelectedCategory('');
    saveFilteredItens([]);
  }

  return (
    <div>
      <button
        onClick={ handleAllClick }
        type="button"
        data-testid="All-category-filter"
      >
        All
      </button>
      {filtersSlice.map((filter) => (
        <button
          type="button"
          key={ filter.strCategory }
          value={ filter.strCategory }
          onClick={ (e) => handleClick(e) }
          data-testid={ `${filter.strCategory}-category-filter` }
        >
          { filter.strCategory }
        </button>
      ))}
    </div>
  );
};

export default FilterDrinksCategory;
