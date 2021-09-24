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
    <button type="button" onClick={ handleClickSearchBar } className="css_botton_2">
      <img src={ searchIcon } alt="search Icon" data-testid="search-top-btn" />
    </button>
  );

  const handleClickProfile = () => {
    history.push('/perfil');
  };

  return (
    <>
      <header>
        <div className="container_header">
          <button type="button" onClick={ handleClickProfile } className="css_botton_1">
            <img src={ profileIcon } alt="search Icon" data-testid="profile-top-btn" />
          </button>
          <h1 data-testid="page-title">{ title }</h1>
          { hasSearchIcon && renderButton()}
        </div>
      </header>

      { showSearchBar && <HeaderSearchBar page={ page } /> }
    </>
  );
}

Header.propTypes = {
  title: propTypes.string,
  hasSearchIcon: propTypes.bool,
  page: propTypes.string,
}.isRequired;

export default Header;
