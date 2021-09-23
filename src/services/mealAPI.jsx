export const fetchMealIngredient = async (ingrediente) => {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  console.log(result.json());
};

export const fetchMealName = async (nome) => {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
  console.log(result.json());
};

export const fetchMealFirstLetter = async (primeiraLetra) => {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  console.log(result.json());
};
