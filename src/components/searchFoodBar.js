import React, { useContext, useState } from 'react';
import recipesContext from '../context';
import fetchAPI from '../services/fetchAPI';

// Quando for montar a SearchBar é necessário passar o título da página como props, conforme linha 98

function SearchFoodBar() {
  const {
    setMeals,
    setLoading,
  } = useContext(recipesContext);
  const [searchParameter, setSearchParameter] = useState();

  function handleSearchParameter({ target: { name, value } }) {
    setSearchParameter({ ...searchParameter, [name]: value });
  }

  async function searchAPI() {
    setLoading(true);
    let apiResults;
    // Depois, com base no resultado acima, faz a requisição à API de acordo com o campo de texto
    switch (searchParameter.radio) {
    case 'ingredient':
      apiResults = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchParameter.text}`);
      break;
    case 'text':
      apiResults = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchParameter.text}`);
      break;
    case 'firstLetter':
      apiResults = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchParameter.text}`);
      break;
    default:
      break;
    }
    // Seta os resultados na context para apresentar os cards ao usuário
    setMeals(apiResults);
    setLoading(false);
  }

  function checkInput() {
    // Checa se estamos pequisando a primeira letra e se o input é maior que um caractere,
    // se for, aparece um alert na tela. Caso contrário, faz a pesquisa na API normalmente
    if (searchParameter.radio === 'firstLetter' && searchParameter.text.length !== 1) {
      global.alert('Digite apenas uma letra');
    } else {
      searchAPI();
    }
  }

  return (
    <div className="search-metods">
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
        placeholder="Buscar"
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

export default SearchFoodBar;
