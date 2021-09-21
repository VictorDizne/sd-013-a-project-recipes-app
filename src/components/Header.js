import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  /* const { glass, setGlass } = useState;
  if(glass) {
    setGlass
  }  */
  return (
    <header>
      <Link
        to="/perfil"
      >
        <img alt="profile" data-testid="profile-top-btn" src={ profileIcon } />
      </Link>
      <h1 data-testid="page-title">Comidas</h1>
      <Link
        to="/explorar"
      >
        <img alt="search" data-testid="search-top-btn" src={ searchIcon } />
      </Link>
    </header>
  );
}

export default Header;
