import React from 'react';
import Button from './Button';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ text }) {
  return (
    <header>
      <Button
        // handleClick={}
        testID="profile-top-btn"
      >
        <img src={ profileIcon } alt="profile" />
      </Button>
      <h1 data-testid="page-title">{ text }</h1>
      <Button
        // handleClick={}
        testID="search-top-btn"
      >
        <img src={ searchIcon } alt="search" />
      </Button>
    </header>
  );
}

export default Header;
