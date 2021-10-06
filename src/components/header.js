import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import SearchButton from './searchButton';
import '../pages/css/header.css';

export default function Header({ name, search }) {
  return (
    <header
      className="d-flex justify-content-around d-flex align-items-center"
      data-testid="header-test"
    >
      <Link
        to="/perfil"
      >
        <button type="button" className="profile-btn">
          <img
            alt="button-icon"
            src={ profileIcon }
            data-testid="profile-top-btn"
          />
        </button>
      </Link>
      <h1 data-testid="page-title">{name}</h1>
      {search && <SearchButton />}
    </header>
  );
}

Header.propTypes = {
  name: propTypes.string.isRequired,
  search: propTypes.bool.isRequired,
};
