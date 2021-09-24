export const fetchSearchApi = async (searchInput, radioInput, myPage) => {
  if (radioInput === 'ingredient') {
    const returnedJson = await fetch(`https://www.${myPage}.com/api/json/v1/1/filter.php?i=${searchInput}`)
      .then((res) => res.json());
    return returnedJson;
  } if (radioInput === 'name') {
    const returnedJson = await fetch(`https://www.${myPage}.com/api/json/v1/1/search.php?s=${searchInput}`)
      .then((res) => res.json());
    return returnedJson;
  }
  if (radioInput === 'first-letter' && searchInput.length > 1) {
    global.alert('Sua busca deve conter somente 1 (um) caracter');
  }
  const returnedJson = await fetch(`https://www.${myPage}.com/api/json/v1/1/search.php?f=${searchInput}`)
    .then((res) => res.json());
  return returnedJson;
};

export const fetchRandonRecipes = async (myPage) => {
  const returnedJson = await fetch(`https://www.${myPage}.com/api/json/v1/1/search.php?s=`)
    .then((res) => res.json());
  return returnedJson;
};

/* Requisição para Categorias de meals and Drinks */

export const fetchCategory = async (myPage) => {
  const result = await fetch(`https://www.${myPage}.com/api/json/v1/1/list.php?c=list`)
    .then((resp) => resp.json());
  return result;
};

export const fetchCategoryApi = async (myPage, category) => {
  const result = await fetch(`https://www.${myPage}.com/api/json/v1/1/filter.php?c=${category}`)
    .then((resp) => resp.json());
  return result;
}


  // www.themealdb.com/api/json/v1/1/categories.php
  // www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail


  //https://www.themealdb.com/api/json/v1/1/filter.php?c=All