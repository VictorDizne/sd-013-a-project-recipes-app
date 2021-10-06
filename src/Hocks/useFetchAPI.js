import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const endpointFoods = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const emdPointDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function useFetchAPI() {
  const [data, setData] = useState([]);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes('comidas')) {
      const fetchComidas = async () => {
        const response = await fetch(endpointFoods);
        const { meals } = await response.json();
        setData(meals);
      };
      fetchComidas();
    } else {
      const fechBebidas = async () => {
        const response = await fetch(emdPointDrinks);
        const { drinks } = await response.json();
        setData(drinks);
      };
      fechBebidas();
    }
  }, [pathname]);

  return (
    [data, setData]
  );
}

export default useFetchAPI;
