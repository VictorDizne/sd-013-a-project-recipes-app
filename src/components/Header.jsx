import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';

function Header({ title, search }) {
  const [disable, setDisable] = useState(false);

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
            <input type="text" placeholder="Buscar Receita" data-testid="search-input" />
          </div>

          <div className="radio-container">
            <label htmlFor="ingrediente">
              <input
                className="radio-input"
                name="options"
                id="ingrediente"
                type="radio"
                value="Ingrediente"
                data-testid="ingredient-search-radio"
              />
              Ingrediente
            </label>

            <label htmlFor="nome">
              <input
                className="radio-input"
                name="options"
                id="nome"
                type="radio"
                value="Nome"
                data-testid="name-search-radio"
              />
              Nome
            </label>

            <label htmlFor="primeira-letra">
              <input
                className="radio-input"
                name="options"
                id="primeira-letra"
                type="radio"
                value="Primeira letra"
                data-testid="first-letter-search-radio"
              />
              Primeira Letra
            </label>
          </div>
          <button
            className="header-button"
            type="button"
          >
            Buscar
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
