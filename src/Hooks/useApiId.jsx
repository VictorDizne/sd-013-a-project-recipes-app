import { useEffect, useState } from 'react';

const useApiId = (type, id) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchId = async () => {
      const result = await fetch(`https://www.${type}.com/api/json/v1/1/lookup.php?i=${id}`);
      const json = await result.json();
      if (type === 'themealdb') {
        setData(json.meals);
      }
      setData(json.drinks);
    };
    fetchId();
  }, [id, type]);
  return data;
};

export default useApiId;
