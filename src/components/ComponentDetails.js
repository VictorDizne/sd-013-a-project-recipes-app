import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import recipeContext from '../context';
import ComponentDetailsCard from './ComponentDetailsCard';

function ComponentDetails() {
  const { fetchDetails, details, dataForFetch: { currentPage },
    handleCurrentPage } = useContext(recipeContext).ContextDetails;
  const { id } = useParams();

  useEffect(() => {
    handleCurrentPage();

    if (currentPage !== '') fetchDetails(currentPage, 'lookup', 'i', id);
  }, [currentPage, id]);

  const filterIngredients = () => {
    const currentObject = Object.entries(details[0]);

    const ingredientArray = currentObject.filter((ingredientKey) => ingredientKey[0]
      .includes('strIngredient') && ingredientKey[1] !== '');

    const renderIngredients = ingredientArray.map((item, index) => (
      <p data-testid={ `${index}-ingredient-name-and-measure` } key={ item }>{item[1]}</p>
    ));

    return renderIngredients;
  };

  const filterMeasure = () => {
    const currentObject = Object.entries(details[0]);

    const measureArray = currentObject.filter((measureKey) => measureKey[0]
      .includes('strMeasure') && measureKey[1] !== '');

    const renderMeasure = measureArray.map((item) => (
      <p key={ item }>{item[1]}</p>
    ));

    return renderMeasure;
  };

  if (details === '') return <h1>Loading</h1>;
  return (
    <div>
      { details.map((item, index) => (
        <ComponentDetailsCard
          key={ index }
          detailItem={ item }
        />
      )) }
      {filterIngredients()}
      {filterMeasure()}
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <button data-testid="start-recipe-btn" type="button">Iniciar receita</button>
    </div>
  );
}

export default ComponentDetails;
