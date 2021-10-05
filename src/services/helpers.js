// solução feita a partir do repositório https://github.com/tryber/sd-013-a-project-recipes-app/blob/main-group-3-requisito-28/src/components/RecipeDetailCard.jsx
export const getIngredients = (meal) => {
  const strMeal = Object.entries(meal[0]);
  const strIngredient = strMeal.filter(([key, value]) => key
    .includes('strIngredient') && value);
  const strMeasure = strMeal.filter(([key, value]) => key
    .includes('strMeasure') && value);
  return strIngredient.map((item, index) => `${item[1]} - ${strMeasure[index][1]}`);
};

export const shareMealHelper = (historyId, setMessageAlert) => {
  const url = `http://localhost:3000/comidas/${historyId}`;
  const SET_TIME_OUT = 1000;
  navigator.clipboard.writeText(url);
  setMessageAlert('Link copiado!');
  setTimeout(() => {
    setMessageAlert('');
  }, SET_TIME_OUT);
};

export const shareDrinkHelper = (historyId, setMessageAlert) => {
  const url = `http://localhost:3000/bebidas/${historyId}`;
  const SET_TIME_OUT = 1000;
  navigator.clipboard.writeText(url);
  setMessageAlert('Link copiado!');
  setTimeout(() => {
    setMessageAlert('');
  }, SET_TIME_OUT);
};
