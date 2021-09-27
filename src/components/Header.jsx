import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileImage from '../images/profileIcon.svg';
import searchImage from '../images/searchIcon.svg';
import HeaderSearch from './HeaderSearch';

function Header({ tela, showSearch = true }) {
  const [inputSearch, setInputSearch] = useState(false);

  const handleChange = () => {
    setInputSearch(!inputSearch);
  };

  return (
    <div>
      <Link to="/perfil">
        <input
          type="image"
          data-testid="profile-top-btn"
          src={ profileImage }
          alt="Ícone Profile"
        />
      </Link>
      <h2 data-testid="page-title">{ tela }</h2>
      {
        showSearch && (
          <input
            type="image"
            data-testid="search-top-btn"
            onClick={ handleChange }
            src={ searchImage }
            alt="Ícone Busca"
          />
        )
      }
      { inputSearch && <HeaderSearch tela={ tela } /> }
    </div>
  );
}

Header.propTypes = {
  tela: PropTypes.string,
}.isRequired;

export default Header;
