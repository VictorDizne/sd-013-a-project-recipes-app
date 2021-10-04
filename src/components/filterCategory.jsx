import React, { useState, useEffect, useContext } from 'react';
import appContext from '../redux/appcontext';

const FilterCategory = () => {
  const [filters, setFilters] = useState([]);
  const { saveFilteredItens } = useContext(appContext);
  // const [trueOrFalse, setTrueOrFalse] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const filtersSlice = filters.slice(Number('0'), Number('5'));
  useEffect(() => {
    async function fecthFilters() {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const { meals } = await fetch(endpoint).then((res) => res.json());
      setFilters(meals);
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
      const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`;
      const result = await fetch(endpoint).then((res) => res.json());
      const slicedResult = result.meals.slice(0, Number('12'));
      saveFilteredItens(slicedResult);
    }
  }

  function handleAllClick() {
    setSelectedCategory('');
    saveFilteredItens([]);
  }

  return (
    <div className="btn-group">
      <button
        className="btn btn-outline-dark"
        onClick={ handleAllClick }
        type="button"
        data-testid="All-category-filter"
      >
        All
      </button>
      {filtersSlice.map((filter) => (
        <button
          type="button"
          className="btn btn-outline-dark"
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

export default FilterCategory;
