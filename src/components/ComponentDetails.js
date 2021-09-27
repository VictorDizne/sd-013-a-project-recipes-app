import React, { useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import recipeContext from '../context';

function ComponentDetails() {
  const { dataForFetch: { currentPage }, handleCurrentPage, fetchDetails,
    details } = useContext(recipeContext).ContextDetails;
  const { strMeal, strCategory, strInstructions, strMealThumb } = details;
  const { id } = useParams();
  const firstRender = useRef(true);

  useEffect(() => {
    handleCurrentPage();
  }, []);

  useEffect(() => {
    if (!firstRender.current) {
      fetchDetails(currentPage, 'lookup', 'i', id);
    } else {
      firstRender.current = false;
    }
  }, [currentPage]);

  if (details === '') return <h1>loading</h1>;

  return (
    <div>
      <h1>Details</h1>
      <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <h4 data-testid="recipe-category">{strCategory}</h4>
      <p data-testid="instructions">{strInstructions}</p>
    </div>
  );
}

export default ComponentDetails;
