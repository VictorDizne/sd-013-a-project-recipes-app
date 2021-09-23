import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBox from './SearchBox';

function Header() {
  const location = useLocation();
  const history = useHistory();

  const [title, setTitle] = useState('Comidas');
  const [buttonSearch, setButtonSearch] = useState(true);
  const [inputSearch, setInputSearch] = useState(false);

  const conditionalTitle = () => {
    switch (location.pathname) {
    case '/comidas':
      setTitle('Comidas');
      break;
    case '/bebidas':
      setTitle('Bebidas');
      break;
    case '/explorar':
      setTitle('Explorar');
      setButtonSearch(false);
      break;
    case '/explorar/bebidas':
      setTitle('Explorar Bebidas');
      setButtonSearch(false);
      break;
    case '/explorar/comidas':
      setTitle('Explorar Comidas');
      setButtonSearch(false);
      break;
    case '/explorar/comidas/ingredientes':
    case '/explorar/bebidas/ingredientes':
      setTitle('Explorar Ingredientes');
      setButtonSearch(false);
      break;
    case '/receitas-feitas':
      setTitle('Receitas Feitas');
      setButtonSearch(false);
      break;
    case '/receitas-favoritas':
      setTitle('Receitas Favoritas');
      setButtonSearch(false);
      break;
    case '/explorar/comidas/area':
      setTitle('Explorar Origem');
      setButtonSearch(true);
      break;
    case '/perfil':
      setTitle('Perfil');
      setButtonSearch(false);
      break;
    default:
      break;
    }
  };

  useEffect(conditionalTitle, [location]);

  function handleClickProfile() {
    history.push('/perfil');
  }

  function handleClickBtnSearch() {
    setInputSearch(true);
    if (inputSearch) return setInputSearch(false);
  }

  return (
    <header>
      <input
        type="image"
        src={ profileIcon }
        alt="profile"
        data-testid="profile-top-btn"
        onClick={ handleClickProfile }
      />
      <h1 data-testid="page-title">{title}</h1>
      {
        buttonSearch && <input
          type="image"
          src={ searchIcon }
          alt="search"
          data-testid="search-top-btn"
          onClick={ handleClickBtnSearch }
        />
      }
      {
        inputSearch && <SearchBox />
      }
    </header>
  );
}

export default Header;
