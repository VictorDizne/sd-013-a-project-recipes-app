export const fetchCocktailIngredient = async (ingrediente) => {
  const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  console.log(result.json());
};

export const fetchCocktailName = async (nome) => {
  const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
  console.log(result.json());
};

export const fetchCocktailFirstLetter = async (primeiraLetra) => {
  const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  console.log(result.json());
};
