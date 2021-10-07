import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import Context from '../ContextAPI/Context';

function Button() {
  const [fetchButtons, setFetchButtons] = useState([]);
  const [button, setButton] = useState('All');

  const { pathname } = useLocation();

  const { fetchCategories, fetchAPI } = useContext(Context);

  const CINCO = 5;

  const pathnameCheck = () => {
    switch (pathname) {
    case '/comidas':
      return 'themealdb';
    case '/bebidas':
      return 'thecocktaildb';
    default:
      return null;
    }
  };

  const handleClick = (event) => {
    setButton(event.target.innerText);
    if (event.target.innerText === 'All'
    || event.target.innerText === button) {
      // O return dentro do if substitui o else pois encerra a execução da função handleClick.
      return fetchAPI(pathnameCheck());
    }
    fetchCategories(pathnameCheck(), event.target.innerText);
  };

  useEffect(() => {
    // Requisição para renderizar os botões ao carregar a página.
    const functionFetchButton = async (type) => {
      const result = await fetch(`https://www.${type}.com/api/json/v1/1/list.php?c=list`);
      const json = await result.json();
      if (type === 'themealdb') {
        setFetchButtons(json.meals.slice(0, CINCO));
      } else {
        setFetchButtons(json.drinks.slice(0, CINCO));
      }
    };
    functionFetchButton(pathnameCheck());
  }, []);

  return (
    <div>
      {fetchButtons.map((categoryName, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `${categoryName.strCategory}-category-filter` }
          onClick={ handleClick }
        >
          {categoryName.strCategory}
        </button>
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleClick }
      >
        All
      </button>
    </div>
  );
}

Button.propTypes = {
  categoryName: PropTypes.string,
}.isRequired;

export default Button;
