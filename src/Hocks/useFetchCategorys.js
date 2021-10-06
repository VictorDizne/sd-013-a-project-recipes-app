import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const endpointFoodsCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const emdPointDrinksCategory = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

function useFetchCategorys() {
  const [category, setCategory] = useState([]);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes('comidas')) {
      const categoryFood = async () => {
        const response = await fetch(endpointFoodsCategory);
        const { meals } = await response.json();
        setCategory(meals);
      };
      categoryFood();
    } else {
      const categoryDrink = async () => {
        const response = await fetch(emdPointDrinksCategory);
        const { drinks } = await response.json();
        setCategory(drinks);
      };
      categoryDrink();
    }
  }, [pathname]);

  return (
    [category, setCategory]
  );
}

export default useFetchCategorys;
