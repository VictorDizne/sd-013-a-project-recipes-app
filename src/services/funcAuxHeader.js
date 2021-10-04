import { cocktailsAPIRequest, foodAPIRequest } from './APIrequest';

export const filterByClickFood = async (
  radioFilter, inputFilter, setInputFilter, setDataFood,
) => {
  if (radioFilter === 'ingrediente') {
    const foodRequestI = await foodAPIRequest('filter', `i=${inputFilter}`);
    setDataFood(foodRequestI);
    setInputFilter('');
    console.log('ingredients');
  }

  if (radioFilter === 'nome') {
    const foodRequestS = await foodAPIRequest('search', `s=${inputFilter}`);
    setDataFood(foodRequestS);
    setInputFilter('');
  }

  if (radioFilter === 'primeira-letra') {
    const foodRequest = await foodAPIRequest('search', `f=${inputFilter}`);
    setDataFood(foodRequest);
    setInputFilter('');
  }
};

export const filterByClickDrink = async (
  radioFilter, inputFilter, setInputFilter, setDataDrink,
) => {
  if (radioFilter === 'ingrediente') {
    const drinkRequestI = await cocktailsAPIRequest('filter', `i=${inputFilter}`);
    setDataDrink(drinkRequestI);
    setInputFilter('');
    console.log('ingredients', drinkRequestI);
  }

  if (radioFilter === 'nome') {
    const drinkRequestS = await cocktailsAPIRequest('search', `s=${inputFilter}`);
    setDataDrink(drinkRequestS);
    setInputFilter('');
  }

  if (radioFilter === 'primeira-letra') {
    const drinkRequest = await cocktailsAPIRequest('search', `f=${inputFilter}`);
    setDataDrink(drinkRequest);
    setInputFilter('');
  }
};
