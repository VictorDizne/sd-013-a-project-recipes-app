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
    console.log(json[dataKey]);
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
};

export const generic = () => null;
