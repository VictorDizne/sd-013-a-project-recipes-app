const endpointFilterByFood = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const endpointFilterByDrink = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export const categoryFood = async (categorySelect) => {
  const response = await fetch(`${endpointFilterByFood}${categorySelect}`);
  const { meals } = await response.json();
  return meals;
};

export const categoryDrink = async (categorySelect) => {
  const response = await fetch(`${endpointFilterByDrink}${categorySelect}`);
  const { drinks } = await response.json();
  return drinks;
};

export const handleCategorySelect = (param1, category) => {
  if (param1.includes('comidas')) {
    return categoryFood(category);
  }
  if (param1.includes('bebidas')) {
    return categoryDrink(category);
  }
};
