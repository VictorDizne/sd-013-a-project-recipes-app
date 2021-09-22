// Se o radio selecionado for Ingrediente

export const fetchByIngredient = async (type = 'themealdb', ingredient) => {
  const urlIngrediente = `https://www.${type}.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const res = await fetch(urlIngrediente);
  const json = await res.json();
  return json.meals;
};

// se o radio selecionado for name
export const fetchByName = async (type = 'themealdb', name) => {
  const urlName = `https://www.${type}.com/api/json/v1/1/search.php?s=${name}`;
  const res = await fetch(urlName);
  const json = await res.json();
  return json.meals;
};

// se o radio selecionado for apenas a primeira letra
export const fetchByLetter = async (type = 'themealdb', firstLetter) => {
  const urlFirstLetter = `https://www.${type}.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const res = await fetch(urlFirstLetter);
  const json = await res.json();
  console.log(json.meals);
  return json.meals;
};
