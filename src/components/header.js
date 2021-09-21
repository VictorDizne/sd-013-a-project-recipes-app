import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './searchBar';

export default function Header() {
  return (
    <header>
      <Link
        to="/perfil"
        className="profile-btn"
        data-testid="profile-top-btn"
      >
        <img
          alt="button-icon"
          src={ profileIcon }
        />
      </Link>
      <h1 data-testid="page-title">Comidas</h1>
      <SearchBar />
    </header>
  );
}
