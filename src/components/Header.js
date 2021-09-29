import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import HeaderSearchBar from './HeaderSearchBar';
import '../styles/Header.css';

function Header({ title, hasSearchIcon, page }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const history = useHistory();

  const handleClickSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const renderButton = () => (
    <button type="button" onClick={ handleClickSearchBar } className="header-buttons">
      <img src={ searchIcon } alt="search Icon" data-testid="search-top-btn" />
    </button>
  );

  const handleClickProfile = () => {
    history.push('/perfil');
  };

  return (
    <>
      <header className="header-container">
        <button type="button" onClick={ handleClickProfile } className="header-buttons">
          <img src={ profileIcon } alt="search Icon" data-testid="profile-top-btn" />
        </button>
        <h1 data-testid="page-title" className="header-title">{ title }</h1>
        { hasSearchIcon && renderButton()}
        { !hasSearchIcon && <div /> }
      </header>

      { showSearchBar && <HeaderSearchBar
        page={ page }
        handleClickSearchBar={ handleClickSearchBar }
      /> }
    </>
  );
}

Header.propTypes = {
  title: propTypes.string,
  hasSearchIcon: propTypes.bool,
  page: propTypes.string,
}.isRequired;

export default Header;
