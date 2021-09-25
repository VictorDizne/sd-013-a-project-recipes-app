export const fetchForIngredient = async (ingrediente) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const data = await fetch(endpoint)
    .then((response) => response.json());
  return data;
};

export const fetchForName = async (nome) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;
  const data = await fetch(endpoint)
    .then((response) => response.json());
  return data;
};

export const fetchForFirstLetter = async (primeiraLetra) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`;
  const data = await fetch(endpoint)
    .then((response) => response.json());
  return data;
};

export const handleAPI = (param1, text) => {
  if (param1 === 'ingrediente') {
    fetchForIngredient(text);
  }
  if (param1 === 'nome') {
    fetchForName(text);
  }
  if (param1 === 'primeira letra' && text.length > 1) {
    global.alert('Sua busca deve conter somente 1 (um) caracter');
  } else {
    fetchForFirstLetter(text);
  }
};
