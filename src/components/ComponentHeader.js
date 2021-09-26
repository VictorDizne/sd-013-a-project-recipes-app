// @ts-check
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import './Styles/Header.css';
import recipeContext from '../context';

function Header({ title, hideProfile, hideSearch }) {
  const currentContext = useContext(recipeContext).ContextHeader;
  const { handleShowInput } = currentContext;

  const searchComponent = (
    <button
      type="button"
      onClick={ handleShowInput }
    >
      <img alt="search" data-testid="search-top-btn" src={ searchIcon } />
    </button>);

  const profileComponent = (
    <Link to="/perfil">
      <img alt="profile" data-testid="profile-top-btn" src={ profileIcon } />
    </Link>);

  return (
    <header className="header">
      {!hideProfile && profileComponent}
      <h1 data-testid="page-title">{ title }</h1>
      {!hideSearch && searchComponent}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hideProfile: PropTypes.bool.isRequired,
  hideSearch: PropTypes.bool.isRequired,
}.isRequired;

export default Header;
