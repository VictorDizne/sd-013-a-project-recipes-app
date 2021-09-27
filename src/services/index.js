export const fetchRecipes = async (query, type, path) => {
  let strUrl = '';
  let dataKey = '';
  if (path === '/comidas') {
    strUrl = 'meal';
    dataKey = 'meals';
  } else {
    strUrl = 'cocktail';
    dataKey = 'drinks';
  }

  if (type === 'ingredient') {
    const response = await fetch(`https://www.the${strUrl}db.com/api/json/v1/1/filter.php?i=${query}`);
    const json = await response.json();
    return json[dataKey];
  }
  if (type === 'name') {
    const response = await fetch(`https://www.the${strUrl}db.com/api/json/v1/1/search.php?s=${query}`);
    const json = await response.json();
    return json[dataKey];
  }
  if (type === 'firstLetter') {
    const response = await fetch(`https://www.the${strUrl}db.com/api/json/v1/1/search.php?f=${query}`);
    const json = await response.json();
    return json[dataKey];
  }
  if (type === 'list') {
    const response = await fetch(`https://www.the${strUrl}db.com/api/json/v1/1/list.php?c=${query}`);
    const json = await response.json();
    return json[dataKey];
  }
  if (type === 'category') {
    // www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink
    const response = await fetch(`https://www.the${strUrl}db.com/api/json/v1/1/filter.php?c=${query}`);
    const json = await response.json();
    return json[dataKey];
  }
};

export const fetchDetails = async (path, id) => {
  let strUrl = '';
  let dataKey = '';
  if (path.includes('/comidas')) {
    strUrl = 'meal';
    dataKey = 'meals';
  } else {
    strUrl = 'cocktail';
    dataKey = 'drinks';
  }
  const response = await fetch(`https://www.the${strUrl}db.com/api/json/v1/1/lookup.php?i=${id}`);
  const json = await response.json();
  return json[dataKey][0];
};
