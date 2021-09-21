import React, { useContext } from 'react';
import MyContext from '../context/myContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = () => {
  const contexto = useContext(MyContext);
  return (
    <nav>
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="profile"
      />
      <h2 data-testid="page-title">NOME DA PAG</h2>
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="lupa"
      />
    </nav>
  );
};

export default Header;
