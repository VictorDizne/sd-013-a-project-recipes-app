import PropTypes from 'prop-types';
import React, { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import './css/Header.css';

const Header = ({ pageTitle, history, isMeal }) => {
  const [showBar, setShowBar] = useState(false);

  const checkObj = {
    'Explorar Origem': true,
    Comidas: true,
    Bebidas: true,
  };

  const handleSearchBtnClick = () => {
    setShowBar(!showBar);
  };

  return (
    <>
      <header className="header-container">
        <input
          type="image"
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="profile icon"
          onClick={ () => history.push('/perfil') }
        />
        <h2 data-testid="page-title">{ pageTitle }</h2>
        {checkObj[pageTitle]
        && <input
          type="image"
          data-testid="search-top-btn"
          alt="search icon"
          src={ searchIcon }
          onClick={ handleSearchBtnClick }
        />}
      </header>
      {showBar && <SearchBar isMeal={ isMeal } />}
    </>
  );
};

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
  isMeal: PropTypes.bool.isRequired,
};

export default Header;
