import React from 'react';
// import { useLocation } from 'react-router-dom';

const FoodRecipeDetails = () => {
  // const location = useLocation();

  return (
    <>
      <h1>Component</h1>
      <p>{ window.location.origin }</p>
      <p>{ window.location.href }</p>
    </>
  );
};

export default FoodRecipeDetails;
