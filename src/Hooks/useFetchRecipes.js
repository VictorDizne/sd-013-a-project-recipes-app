import { useContext, useEffect } from 'react';
import Context from '../Context/Context';

const useFetchRecipes = (page) => {
  const { setRecipes } = useContext(Context);
  const url = `https://www.${page}db.com/api/json/v1/1/search.php?s=`;

  useEffect(() => {
    const fetchRecipes = async () => {
      const result = await (await fetch(url)).json();
      setRecipes(result);
    };

    fetchRecipes();
  }, []);
};

export default useFetchRecipes;
