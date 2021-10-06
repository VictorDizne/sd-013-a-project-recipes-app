import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../Context/Context';
import Button from './Button';
import Input from './Input';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ text, secondButton }) {
  const { data, setData } = useContext(Context);
  const [render, setRender] = useState(false);
  const handleInput = () => (render ? setRender(false) : setRender(true));
  const [input, setInput] = useState({
    inputText: '',
    inputSearch: '',
  });

  useEffect(() => {}, [render]);

  const handleChange = (e) => {
    setInput({
      ...input,
      inputText: e.target.value });
  };

  const handleCheck = (e) => {
    setInput({
      ...input,
      inputSearch: e.target.value });
  };

  const handleClick = () => {
    if (input.inputSearch === 'firstLetter' && input.inputText.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    setData({
      text: input.inputText,
      search: input.inputSearch,
    });
  };

  useEffect(() => {}, [data]);

  return (
    <div>
      <header>
        <Link to="/perfil">
          <Button>
            {/* // handleClick={}
            testID="profile-top-btn"
            image={ profileIcon } */}
            <img src={ profileIcon } data-testid="profile-top-btn" alt="profile" />
          </Button>
        </Link>
        <h1 data-testid="page-title">{ text }</h1>
        {secondButton
          ? (
            <Button
              handleClick={ handleInput }
              // testID="search-top-btn"
              // image={ searchIcon }
            >
              <img src={ searchIcon } data-testid="search-top-btn" alt="search" />
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
              handleChange={ handleChange }
            />
            <Input
              labelText="Ingrediente"
              value="ingredient"
              name="search-radio"
              inputType="radio"
              testID="ingredient-search-radio"
              handleChange={ handleCheck }
            />
            <Input
              labelText="Nome"
              value="nameSearch"
              name="search-radio"
              inputType="radio"
              testID="name-search-radio"
              handleChange={ handleCheck }
            />
            <Input
              labelText="Primeira letra"
              value="firstLetter"
              name="search-radio"
              inputType="radio"
              testID="first-letter-search-radio"
              handleChange={ handleCheck }
            />
            <Button
              testID="exec-search-btn"
              handleClick={ handleClick }
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
