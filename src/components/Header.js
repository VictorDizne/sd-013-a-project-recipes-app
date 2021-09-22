// @ts-check
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import './Header.css';

function Header({ title, hideProfile, hideSearch }) {
  const searchComponent = (
    <Link to="/explorar">
      <img alt="search" data-testid="search-top-btn" src={ searchIcon } />
    </Link>);

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
