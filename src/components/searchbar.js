import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../context';
import fetchAPI from '../services/fetchAPI';

// Quando for montar a SearchBar é necessário passar o título da página como props, conforme linha 98

function SearchBar({ title }) {
  const {
    setCardsToShow,
    searchParameter,
    setSearchParameter,
    setLoading,
  } = useContext(recipesContext);

  function handleSearchParameter({ target: { name, value } }) {
    setSearchParameter({ ...searchParameter, [name]: value });
  }

  async function searchAPI(foodOrDrink) {
    setLoading(true);
    let apiURL;
    let apiResults;
    // Primeiro checa se iremos pesquisar por uma comida ou por um drink
    if (foodOrDrink === 'Comidas' || foodOrDrink === 'Explorar origem') {
      apiURL = 'themealdb';
    } else {
      apiURL = 'thecocktaildb';
    }
    // Depois, com base no resultado acima, faz a requisição à API de acordo com o campo de texto
    switch (searchParameter.radio) {
    case 'ingredient':
      apiResults = await fetchAPI(`https://www.${apiURL}.com/api/json/v1/1/filter.php?i=${searchParameter.text}`);
      break;
    case 'text':
      apiResults = await fetchAPI(`https://www.${apiURL}.com/api/json/v1/1/search.php?s=${searchParameter.text}`);
      break;
    case 'firstLetter':
      apiResults = await fetchAPI(`https://www.${apiURL}.com/api/json/v1/1/search.php?f=${searchParameter.text}`);
      break;
    default:
      break;
    }
    // Seta os resultados na context para apresentar os cards ao usuário
    setCardsToShow(apiResults);
    setLoading(false);
  }

  function checkInput() {
    // Checa se estamos pequisando a primeira letra e se o input é maior que um caractere,
    // se for, aparece um alert na tela. Caso contrário, faz a pesquisa na API normalmente
    if (searchParameter.radio === 'firstLetter' && searchParameter.text.length !== 1) {
      global.alert('Digite apenas uma letra');
    } else {
      searchAPI(title);
    }
  }

  return (
    <div>
      <label htmlFor="filter_radio">
        Ingrediente
        <input
          type="radio"
          name="radio"
          value="ingredient"
          onChange={ handleSearchParameter }
          data-testid="ingredient-search-radio"
        />
      </label>

      <label htmlFor="name">
        Nome
        <input
          type="radio"
          name="radio"
          value="text"
          onChange={ handleSearchParameter }
          data-testid="name-search-radio"
        />
      </label>

      <label htmlFor="firstLetter">
        Primeira Letra
        <input
          type="radio"
          name="radio"
          value="firstLetter"
          onChange={ handleSearchParameter }
          data-testid="first-letter-search-radio"
        />
      </label>

      <input
        type="text"
        data-testid="search-input"
        name="text"
        onChange={ handleSearchParameter }
      />

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ checkInput }
      >
        Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SearchBar;
