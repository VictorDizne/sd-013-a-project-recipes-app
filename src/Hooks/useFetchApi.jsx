import { useEffect, useState } from 'react';

const useFetchApi = (type) => {
  const [recomendationData, setRecomedantion] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const result = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?s=`);
      const json = await result.json();
      if (type === 'themealdb') {
        setRecomedantion(json.meals);
      } else {
        setRecomedantion(json.drinks);
      }
    };
    fetchAPI();
  }, [type]);
  return recomendationData;
};

export default useFetchApi;
