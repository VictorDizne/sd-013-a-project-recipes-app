import React from 'react';

// FUNÇÕES PARA CRIAR O ARRAY DE INGREDIENTES E MEDIDAS
export const arrayIntercale = (arr1, arr2, arr3 = []) => {
  if (arr1.length === 0) return arr3;
  arr3.push(arr1.shift());
  if (arr2.length !== 0) arr3.push(arr2.shift());
  return arrayIntercale(arr1, arr2, arr3);
};

export const filterIngredientsAndMeasures = (details) => {
  const currentObject = Object.entries(details);
  const ingredientArray = currentObject.filter((ingredientKey) => ingredientKey[0]
    .includes('strIngredient') && ingredientKey[1] !== '' && ingredientKey[1] !== null);
  const renderIngredients = ingredientArray.map((item) => item[1]);

  const currentObject2 = Object.entries(details);
  const measureArray = currentObject2.filter((measureKey) => measureKey[0]
    .includes('strMeasure') && measureKey[1] !== ' ' && measureKey[1] !== null);
  const renderMeasure = measureArray.map(((item) => item[1]));

  const arrayIntercaled = arrayIntercale(renderIngredients, renderMeasure);
  return arrayIntercaled;
};

export const ingredientAndMeasureArray = (details) => {
  const array = filterIngredientsAndMeasures(details);
  const shortArrays = [];

  while (array.length > 0) {
    shortArrays.push(array.splice(0, 2));
  }
  const arrayMap = shortArrays.map((item, index) => (
    <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
      {item.toString().replace(',', ' - ')}
    </p>
  ));
  return arrayMap;
};
// FUNÇÕES PARA CRIAR O ARRAY DE INGREDIENTES E MEDIDAS

// FUNÇÕES PARA SETAR O LOCAL STORAGE

// Função que analiza se o protudo esta ou não na lista.
const productIsExistent = (newProduct, favoriteRecipes) => {
  const productFound = favoriteRecipes.find(((recipe) => recipe.id === newProduct.id));
  if (!productFound) return [false, newProduct];
  return [true, productFound];
};

export const saveLocalStorage = (newArray, id) => {
  // Pega a lista de receitas do localStorage
  let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

  // Pesquisa se o receita ja existe pela a Id
  const [isExist, recipe] = productIsExistent(newArray, favoriteRecipes);

  // Verifica se existe a receita
  if (isExist) {
    const updatedProductList = favoriteRecipes.filter((item) => {
      if (item.id !== id) {
        return true;
      }
      return false;
    });
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedProductList));
    return recipe;
  }

  // Se não existe add a nova receita.
  favoriteRecipes = [...favoriteRecipes, recipe];
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
};

// FUNÇÕES PARA SETAR O LOCAL STORAGE
