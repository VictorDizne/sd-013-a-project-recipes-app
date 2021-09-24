export const fetchForIngredient = async (ingrediente) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const data = await fetch(endpoint)
    .then((response) => response.json());
  console.log(data);
  return data;
};

export const fetchForName = async (nome) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;
  const data = await fetch(endpoint)
    .then((response) => response.json());
  console.log(data);
  return data;
};

export const fetchForFirstLetter = async (primeiraLetra) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`;
  const data = await fetch(endpoint)
    .then((response) => response.json());
  console.log(data);
  return data;
};
