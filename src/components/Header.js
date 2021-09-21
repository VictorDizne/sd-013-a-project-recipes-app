import React from 'react';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header() {
  return (
    <header>
      <button type="button">
        <img src={ profileIcon } alt="search Icon" data-testid="profile-top-btn" />
      </button>
      <h1 data-testid="page-title">Comidas</h1>
      <button type="button">
        <img src={ searchIcon } alt="search Icon" data-testid="search-top-btn" />
      </button>
    </header>
  );
}

export default Header;
