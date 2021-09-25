import React, { useState } from 'react';
import { handleAPI } from '../service/GetAPI';

function HeaderSearch() {
  const [inputRadio, setInputRadio] = useState('');
  const [inputText, setInputText] = useState('');

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
    <div>
      <input
        type="text"
        onChange={ handleInputText }
      />
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
  );
}

export default HeaderSearch;
