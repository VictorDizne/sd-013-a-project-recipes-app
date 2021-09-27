import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';

function Button() {
  const [fetchButtons, setFetchButtons] = useState([]);

  const { pathname } = useLocation();

  const CINCO = 5;

  const pathnameCheck = () => {
    console.log(pathname);
    switch (pathname) {
    case '/comidas':
      return 'themealdb';
    case '/bebidas':
      return 'thecocktaildb';
    default:
      return null;
    }
  };

  useEffect(() => {
    const functionFetchButton = async (type) => {
      const result = await fetch(`https://www.${type}.com/api/json/v1/1/list.php?c=list`);
      const json = await result.json();
      console.log(json);
      if (type === 'themealdb') {
        setFetchButtons(json.meals.slice(0, CINCO));
        console.log(fetchButtons);
      } else {
        setFetchButtons(json.drinks.slice(0, CINCO));
        console.log(fetchButtons);
      }
    };
    console.log(fetchButtons);
    functionFetchButton(pathnameCheck());
  }, []);

  return (
    <div>
      {fetchButtons.map((categoryName, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `${categoryName.strCategory}-category-filter` }
        >
          {categoryName.strCategory}
        </button>
      ))}
    </div>
  );
}

Button.propTypes = {
  categoryName: PropTypes.string,
}.isRequired;

export default Button;
