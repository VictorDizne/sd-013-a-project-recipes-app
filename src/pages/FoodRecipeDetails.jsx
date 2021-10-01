import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { ShareButton, LikeButton, MasterCard } from '../components';
import { isThisRecipeDone, isThisRecipeInProgress } from '../services/localStorageFunctions'

const FoodRecipeDetails = () => {

  const [foodRecipeDetails, setFoodRecipeDetails] = useState();
  const [recomended, setRecomended] = useState();

  return (
    <>
      <h1>Component</h1>
      <p>{ window.location.origin }</p>
      <p>{ window.location.href }</p>
    </>
  )
};

export default FoodRecipeDetails;
