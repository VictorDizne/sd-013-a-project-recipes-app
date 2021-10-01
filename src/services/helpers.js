export const setListOfIngredientsAndQuantity = (meals, setQuanitity, setIngredients) => {
  const arrayIngredients = [];
  const arrayQuantity = [];
  const number = 20;
  for (let index = 1; index < number; index += 1) {
    if (meals[`strIngredient${index}`] !== '') {
      arrayIngredients.push(meals[`strIngredient${index}`]);
    }
    if (meals[`strMeasure${index}`] !== null) {
      arrayQuantity.push(meals[`strMeasure${index}`]);
    }
  }
  setQuanitity(arrayQuantity);
  setIngredients(arrayIngredients);
};

// https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
export const copyToClipBoard = async (copyMe, setCopySuccess) => {
  try {
    await navigator.clipboard.writeText(copyMe);
    setCopySuccess('Link copiado!');
  } catch (err) {
    setCopySuccess('Failed to copy!');
  }
};
