import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileImage from '../images/profileIcon.svg';
import searchImage from '../images/searchIcon.svg';
import HeaderSearch from './HeaderSearch';

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
      { inputSearch && <HeaderSearch /> }
    </div>
  );
}

export default Header;
