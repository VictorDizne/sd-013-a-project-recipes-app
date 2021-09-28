export const fetchForIngredient = async (ingrediente) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const response = await fetch(endpoint);
  const { drinks } = await response.json();
  console.log(drinks);
  return drinks;
};

export const fetchForName = async (nome) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`;
  const { drinks } = await fetch(endpoint)
    .then((response) => response.json());
  return drinks;
};

export const fetchForFirstLetter = async (primeiraLetra) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`;
  const { drinks } = await fetch(endpoint)
    .then((response) => response.json());
  console.log(drinks);
  return drinks;
};

export const handleAPIDrinks = (param1, text) => {
  console.log(`parametro${param1}`);
  console.log(`texto${text}`);
  if (param1 === 'ingrediente') {
    return fetchForIngredient(text);
  }
  if (param1 === 'nome') {
    return fetchForName(text);
  }
  if (param1 === 'primeira letra' && text.length === 1) {
    return fetchForFirstLetter(text);
  }
  if (param1 === 'primeira letra' && text.length > 1) {
    global.alert('Sua busca deve conter somente 1 (um) caracter');
  }
};
