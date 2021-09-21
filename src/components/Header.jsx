import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { fetchMealsByQuery, fetchDrinksByQuery } from '../services/API';
import './Header.css';

function Header({ title, search }) {
  const [disable, setDisable] = useState(false);
  const [type, setType] = useState('');
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();

  const handleClick = () => {
    if (type === 'f' && query.length > 1) {
      // eslint-disable-next-line no-alert
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }

    if (title === 'Comidas') {
      fetchMealsByQuery(type, query, dispatch);
    }

    if (title === 'Bebidas') {
      fetchDrinksByQuery(type, query, dispatch);
    }
  };

  return (
    <header className="header-container">
      <div className="header-search">
        <button
          src=""
          type="button"
          className="header-avatar"
        >
          <Link to="/perfil">
            <img src={ profileIcon } alt="avatar" data-testid="profile-top-btn" />
          </Link>
        </button>

        <div
          data-testid="page-title"
        >
          <h1 clasName="header-title">{ title }</h1>
        </div>

        { search && (
          <button
            type="button"
            className="header-glass"
            onClick={ () => setDisable(!disable) }
          >
            <img
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="magnifying glass"
            />
          </button>)}
      </div>
      { disable && (
        <>
          <div>
            <input
              onChange={ (e) => setQuery(e.target.value) }
              value={ query }
              type="text"
              placeholder="Buscar Receita"
              data-testid="search-input"
            />
          </div>

          <div className="radio-container">
            <label htmlFor="ingrediente">
              <input
                onChange={ (e) => setType(e.target.value) }
                className="radio-input"
                name="options"
                id="ingrediente"
                type="radio"
                value="i"
                data-testid="ingredient-search-radio"
              />
              Ingrediente
            </label>

            <label htmlFor="nome">
              <input
                onChange={ (e) => setType(e.target.value) }
                className="radio-input"
                name="options"
                id="nome"
                type="radio"
                value="s"
                data-testid="name-search-radio"
              />
              Nome
            </label>

            <label htmlFor="primeira-letra">
              <input
                onChange={ (e) => setType(e.target.value) }
                className="radio-input"
                name="options"
                id="primeira-letra"
                type="radio"
                value="f"
                data-testid="first-letter-search-radio"
              />
              Primeira Letra
            </label>
          </div>
          <button
            className="header-button"
            type="button"
            data-testid="exec-search-btn"
            onClick={ handleClick }
          >
            Buscar
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
