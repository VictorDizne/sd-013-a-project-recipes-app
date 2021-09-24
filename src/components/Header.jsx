import React/* , { useContext } */ from 'react';
import { Link } from 'react-router-dom';
/* import MyContext from '../context/myContext'; */
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = () => (
  <nav className="header">
    <Link to="/perfil">
      <img
        src={ profileIcon }
        alt="profile"
        data-testid="profile-top-btn"
      />
    </Link>
    <h2 data-testid="page-title">NOME DA PAG</h2>
    <img
      data-testid="search-top-btn"
      src={ searchIcon }
      alt="lupa"
    />
  </nav>
);

export default Header;
