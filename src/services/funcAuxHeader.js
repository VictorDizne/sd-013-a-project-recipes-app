import { cocktailsAPIRequest, foodAPIRequest } from './APIrequest';

export const filterByClickFood = async (
  radioFilter, inputFilter, setInputFilter, setSearchBarFilters,
) => {
  if (radioFilter === 'ingrediente') {
    const foodRequestI = await foodAPIRequest('filter', `i=${inputFilter}`);
    setSearchBarFilters(foodRequestI);
    setInputFilter('');
    console.log('ingredients');
  }

  if (radioFilter === 'nome') {
    const foodRequestS = await foodAPIRequest('search', `s=${inputFilter}`);
    setSearchBarFilters(foodRequestS);
    setInputFilter('');
  }

  if (radioFilter === 'primeira-letra') {
    const foodRequest = await foodAPIRequest('search', `f=${inputFilter}`);
    setSearchBarFilters(foodRequest);
    setInputFilter('');
  }
};

export const filterByClickDrink = async (
  radioFilter, inputFilter, setInputFilter, setSearchBarFilters,
) => {
  if (radioFilter === 'ingrediente') {
    const drinkRequestI = await cocktailsAPIRequest('filter', `i=${inputFilter}`);
    setSearchBarFilters(drinkRequestI);
    setInputFilter('');
    console.log('ingredients');
  }

  if (radioFilter === 'nome') {
    const drinkRequestS = await cocktailsAPIRequest('search', `s=${inputFilter}`);
    setSearchBarFilters(drinkRequestS);
    setInputFilter('');
  }

  if (radioFilter === 'primeira-letra') {
    const drinkRequest = await cocktailsAPIRequest('search', `f=${inputFilter}`);
    setSearchBarFilters(drinkRequest);
    setInputFilter('');
  }
};
