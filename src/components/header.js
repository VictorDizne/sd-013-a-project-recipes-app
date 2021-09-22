import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './searchbar';

function Header({ title }) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  function showSearchButton() {
    // Primeiro checa se a página tem o título de Comidas ou Explorar Origem,
    // a barra de procura deve ser mostrada somente nessa ocasião.
    if (title === 'Comidas' || title === 'Explorar Origem') {
      // Caso esteja na página com título de Comidas ou Explorar Origem, aparece um botão para ser
      // clicado.
      return (
        <button type="button" onClick={ () => setShowSearchBar(!showSearchBar) }>
          <img
            src={ searchIcon }
            alt="searchIcon"
            data-testid="search-top-btn"
          />
        </button>);
    } return null;
  }

  function searchBar() {
    // Checa se deve mostrar a searchBar, se for negativo retorna nulo, se for
    // positivo retorna o componente SearchBar
    const searchBarComponent = showSearchBar ? <SearchBar title={ title } /> : null;
    return searchBarComponent;
  }

  return (
    <header>
      <Link to="/perfil">
        <img
          src={ profileIcon }
          alt="profileIcon"
          data-testid="profile-top-btn"
        />
      </Link>
      <h1 data-testeid="page-title">{ title }</h1>
      {}
      { showSearchButton() }
      { searchBar() }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
