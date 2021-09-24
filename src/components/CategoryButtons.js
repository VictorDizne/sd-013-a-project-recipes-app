import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { fetchRecipes } from '../services';

const MAX_INDEX = 5;
let data = [];

function CategoryButtons() {
  const [listCategory, setListCategory] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      switch (location.pathname) {
      case '/bebidas':
        data = await fetchRecipes('list', 'list', '/');
        setListCategory(data.drinks);
        break;
      case '/comidas':
        data = await fetchRecipes('list', 'list', '/comidas');
        setListCategory(data.meals);
        break;
      default:
        break;
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {listCategory.slice(0, MAX_INDEX).map((category, index) => (
        <button
          key={ category.strCategory }
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
        >
          {category.strCategory }
        </button>

      ))}
    </>
  );
}

export default CategoryButtons;
