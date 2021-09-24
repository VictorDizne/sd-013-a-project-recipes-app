import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import HeaderSearchBar from './HeaderSearchBar';

function Header({ title, hasSearchIcon, page }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const history = useHistory();

  const handleClickSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const renderButton = () => (
    <button type="button" onClick={ handleClickSearchBar }>
      <img src={ searchIcon } alt="search Icon" data-testid="search-top-btn" />
    </button>
  );

  const handleClickProfile = () => {
    history.push('/perfil');
  };

  return (
    <div>
      <header>
        <button type="button" onClick={ handleClickProfile }>
          <img src={ profileIcon } alt="search Icon" data-testid="profile-top-btn" />
        </button>
        <h1 data-testid="page-title">{ title }</h1>
        {
          hasSearchIcon && renderButton()
        }
      </header>

      { showSearchBar && <HeaderSearchBar page={ page } /> }
    </div>
  );
}

Header.propTypes = {
  title: propTypes.string,
  hasSearchIcon: propTypes.bool,
  page: propTypes.string,
}.isRequired;

export default Header;
