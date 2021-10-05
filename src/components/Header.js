import React, { useEffect, useState, useRef, useContext } from 'react';
import { useLocation, useHistory } from 'react-router';
import { MainContext } from '../context/Provider';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBox from './SearchBox';
import CategoryButtons from './CategoryButtons';

function Header() {
  const location = useLocation();
  const history = useHistory();
  const initialRender = useRef(false);
  const { searchSettings, recipes } = useContext(MainContext);

  const [title, setTitle] = useState('Comidas');
  const [buttonSearch, setButtonSearch] = useState(false);
  const [inputSearch, setInputSearch] = useState(false);
  const [category, setCategory] = useState(false);

  const conditionalTitle = () => {
    switch (location.pathname) {
    case '/comidas':
      setTitle('Comidas');
      setButtonSearch(true);
      setCategory(true);
      break;
    case '/bebidas':
      setTitle('Bebidas');
      setButtonSearch(true);
      setCategory(true);
      break;
    case '/explorar':
      setTitle('Explorar');
      break;
    case '/explorar/bebidas':
      setTitle('Explorar Bebidas');
      break;
    case '/explorar/comidas':
      setTitle('Explorar Comidas');
      break;
    case '/explorar/comidas/ingredientes':
    case '/explorar/bebidas/ingredientes':
      setTitle('Explorar Ingredientes');
      break;
    case '/receitas-feitas':
      setTitle('Receitas Feitas');
      break;
    case '/receitas-favoritas':
      setTitle('Receitas Favoritas');
      break;
    case '/explorar/comidas/area':
      setTitle('Explorar Origem');
      setButtonSearch(true);
      break;
    case '/perfil':
      setTitle('Perfil');
      break;
    default:
      break;
    }
  };

  useEffect(conditionalTitle, [location]);

  useEffect(() => {
    if (initialRender.current) {
      const { path } = searchSettings;
      const { idMeal, idDrink } = recipes[0];

      // Path vazio pela busca por categoria
      if (recipes.length === 1 && path) {
        history.push(`${path}/${idMeal || idDrink}`);
      }
    } else {
      initialRender.current = true;
    }
  }, [history, recipes, searchSettings]);

  function handleClickProfile() {
    history.push('/perfil');
  }

  function handleClickBtnSearch() {
    setInputSearch(true);
    setCategory(false);
    if (inputSearch) {
      setInputSearch(false);
      setCategory(true);
    }
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
        category && <CategoryButtons />
      }
      {
        inputSearch && <SearchBox />
      }
    </header>
  );
}

export default Header;
