import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileImage from '../images/profileIcon.svg';
import searchImage from '../images/searchIcon.svg';

function Header() {
  const [inputSearch, setInputSearch] = useState(false);

  const handleChange = () => {
    setInputSearch(!inputSearch);
  };

  return (
    <div>
      <Link to="/perfil">
        <button
          type="button"
          data-testid="profile-top-btn"
        >
          <img src={ profileImage } alt="Ícone Profile" />
        </button>
      </Link>
      <h2 data-testid="page-title">Comidas</h2>
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ handleChange }
      >
        <img src={ searchImage } alt="Ícone Busca" />
      </button>
      { inputSearch && (
        <div>
          <input type="text" data-testid="search-input" />
          <label htmlFor="radio-ingredient">
            Ingrediente
            <input
              id="radio-ingredient"
              data-testid="ingredient-search-radio"
              type="radio"
            />
          </label>
          <label htmlFor="radio-name">
            Nome
            <input
              id="radio-name"
              type="radio"
              data-testid="name-search-radio"
            />
          </label>
          <label htmlFor="radio-first">
            Primeira Letra
            <input
              id="radio-first"
              type="radio"
              data-testid="first-letter-search-radio"
            />
          </label>
          <button type="button" data-testid="exec-search-btn">Busca</button>
        </div>
      ) }
    </div>
  );
}

export default Header;
