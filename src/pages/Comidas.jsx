import React, { useState } from 'react';

const Comidas = () => {
  useEffect(() => {
    const fetchDetails = async () => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id.props}`;
      const results = await fetch(endpoint);
      const { meals } = await results.json();
      setProduto(meals);
      console.log(meals[0].strIngredient1);
    };
    fetchDetails();
  }, []);
  //   for (let i = 1; i < Number('20'); i += i) {
  //     const stringKey = `srtIngredients${i}`;
  //     setIngredients(produto[stringKey]);
  //   }
  return (
    <h1>
      {state.map((meal) => (
        <p key={ meal.idMeal }>
          {meal.strMeal}
        </p>
      ))}
    </h1>
  );
};
export default Comidas;
