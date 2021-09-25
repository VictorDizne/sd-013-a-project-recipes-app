import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { handleAPI } from '../service/GetAPI';
import '../PaginasCss/Header.css';

function Header() {
  const [showInput, setShowInput] = useState(true);
  const [inputRadio, setInputRadio] = useState('');
  const [inputText, setInputText] = useState('');
  const maxCharacters = 14;
  const path = useLocation().pathname.replace('/', '');
  const pathRotesVerify = path === 'explorar'
  || path === 'explorar/comidas'
  || path === 'explorar/bebidas'
  || path === 'explorar/comidas/ingredientes'
  || path === 'explorar/bebidas/ingredientes'
  || path === 'perfil'
  || path === 'receitas-feitas'
  || path === 'receitas-favoritas';
  const pathLong = path.replace(/\//g, ' ').replace(/-/g, ' ').replace('comidas ', '')
    .replace('bebidas ', '')
    .replace('area', 'Origem')
    .toLowerCase()
    .replace(/(?:^|\s)(?!da|de|do)\S/g, (l) => l.toUpperCase());
  const shortPath = path.toLowerCase()
    .replace(/(?:^|\s)(?!da|de|do)\S/g, (l) => l.toUpperCase());
  const formataNome = () => (
    path.length > maxCharacters
      ? pathLong : shortPath
  );
  const clickDisable = () => {
    setShowInput(!showInput);
  };

  const handleInputText = ({ target }) => {
    setInputText(target.value);
  };

  const handleInputRadio = ({ target }) => {
    setInputRadio(target.value);
  };

  const handleClickFetch = () => {
    handleAPI(inputRadio, inputText);
  };

  return (
    <div className="header">
      <Link to="/perfil">
        <img
          className="elementsFooter"
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile"
        />
      </Link>
      <h1 className="elementsFooter" data-testid="page-title">{formataNome()}</h1>
      { pathRotesVerify
        ? null
        : (
          <button className="elementsFooter" type="button" onClick={ clickDisable }>
            <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
          </button>
        )}
      {
        !showInput
          ? (
            <input
              data-testid="search-input"
              disabled={ showInput }
              onChange={ handleInputText }
            />
          ) : null
      }
      <div>
        <input
          type="radio"
          value="ingrediente"
          name="select-search"
          data-testid="ingredient-search-radio"
          onChange={ handleInputRadio }
        />
        ingrediente
        <input
          type="radio"
          value="nome"
          name="select-search"
          data-testid="name-search-radio"
          onChange={ handleInputRadio }
        />
        nome
        <input
          type="radio"
          value="primeira letra"
          name="select-search"
          data-testid="first-letter-search-radio"
          onChange={ handleInputRadio }
        />
        primeira letra
        <button
          type="submit"
          data-testid="exec-search-btn"
          onClick={ handleClickFetch }
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
export default Header;
