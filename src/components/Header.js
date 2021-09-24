import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [showInput, setShowInput] = useState(false);

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

  return (
    <div>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
      </Link>
      <h1 data-testid="page-title">{formataNome()}</h1>
      { pathRotesVerify
        ? null
        : (
          <button type="button" onClick={ clickDisable }>
            <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
          </button>
        )}
      {
        showInput
          ? (
            <input
              data-testid="search-input"
              disabled={ showInput }
            />
          ) : null
      }
    </div>
  );
}

export default Header;
