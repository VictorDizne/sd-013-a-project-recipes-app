import { useEffect, useState } from 'react';

const useApiId = (type, id) => {
  const [data, setData] = useState([]);
  const [isMeal, setIsMeal] = useState(false);
  // console.log(type, 'type');

  useEffect(() => {
    const fetchId = async () => {
      const result = await fetch(`https://www.${type}.com/api/json/v1/1/lookup.php?i=${id}`);
      const json = await result.json();
      if (type === 'themealdb') {
        setData(json.meals[0]);
        setIsMeal(true);
      } else {
        setData(json.drinks[0]);
        setIsMeal(false);
      }
    };
    fetchId();
  }, []);
  // console.log(isMeal, 'isMeal');
  return [data, isMeal];
};

export default useApiId;
