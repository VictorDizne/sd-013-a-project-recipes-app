import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './Button';
import Input from './Input';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ text, secondButton }) {
  const [render, setRender] = useState(false);
  const handleInput = () => (render ? setRender(false) : setRender(true));

  useEffect(() => {}, [render]);

  return (
    <div>
      <header>
        <Link to="/perfil">
          <Button
            // handleClick={}
            testID="profile-top-btn"
            image={ profileIcon }
          >
            <img src={ profileIcon } alt="profile" />
          </Button>
        </Link>
        <h1 data-testid="page-title">{ text }</h1>
        {secondButton
          ? (
            <Button
              handleClick={ handleInput }
              testID="search-top-btn"
              image={ searchIcon }
            >
              <img src={ searchIcon } alt="search" />
            </Button>)
          : null}
      </header>
      {render
        ? (
          <div>
            <Input
              labelText="Procurar"
              name="search"
              inputType="text"
              testID="search-input"
            /* handleChange={} */
            />
            <Input
              labelText="Busca de ingrediente"
              value="ingredient"
              name="search-radio"
              inputType="radio"
              testID="ingredient-search-radio"
            /* handleChange={} */
            />
            <Input
              labelText="Busca por nome"
              value="nameSearch"
              name="search-radio"
              inputType="radio"
              testID="name-search-radio"
            /* handleChange={} */
            />
            <Input
              labelText="Busca a primeira letra"
              value="firstLetter"
              name="search-radio"
              inputType="radio"
              testID="first-letter-search-radio"
            /* handleChange={} */
            />
            <Button
              testID="exec-search-btn"
            >
              Buscar
            </Button>
          </div>)
        : null}
    </div>
  );
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
  secondButton: PropTypes.bool.isRequired,
};

export default Header;
