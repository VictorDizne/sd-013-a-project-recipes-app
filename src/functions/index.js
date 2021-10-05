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

// FUNÇÕES PARA CRIAR O ARRAY DE INGREDIENTES E MEDIDAS

// FUNÇÕES PARA SETAR O LOCAL STORAGE

const productIsExistent = (newProduct, favoriteRecipes) => {
  const productFound = favoriteRecipes.find(((recipe) => recipe.id === newProduct.id));
  if (!productFound) return [false, newProduct];
  return [true, productFound];
};

export const saveLocalStorage = (newArray, id) => {
  let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

  const [isExist, recipe] = productIsExistent(newArray, favoriteRecipes);

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

  favoriteRecipes = [...favoriteRecipes, recipe];
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
};

// FUNÇÕES PARA SETAR O LOCAL STORAGE

export const handleFavoriteIcon = (setFavoriteIcon, favoriteIcon, details, keys) => {
  const alcoholic = details[keys.alcoholicOrNot] || '';
  const areaK = details[keys.area] || '';

  setFavoriteIcon(!favoriteIcon);
  const newArray = {
    id: details[keys.id],
    type: keys.typeK,
    area: areaK,
    category: details[keys.category],
    alcoholicOrNot: alcoholic,
    name: details[keys.title],
    image: details[keys.thumb],
  };
  saveLocalStorage(newArray, details[keys.id]);
};

export const handleShare = (setShareIcon, share, copy) => {
  setShareIcon(!share);
  if (!share) {
    const url = window.location.href.split('/in-progress');
    const splitedURL = url[0];
    copy(splitedURL);
    console.log(splitedURL);
  } else {
    copy('');
  }
};
