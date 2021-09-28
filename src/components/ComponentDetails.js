import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import recipeContext from '../context';
import ComponentDetailsCard from './ComponentDetailsCard';

function ComponentDetails({ drinkOrMeal }) {
  const { fetchDetails, details, dataForFetch: { currentPage },
    handleCurrentPage } = useContext(recipeContext).ContextDetails;
  const { id } = useParams();

  useEffect(() => {
    handleCurrentPage();

    if (currentPage !== '') fetchDetails(currentPage, 'lookup', 'i', id);
  }, [currentPage, id]);

  const arrayIntercale = (arr1, arr2, arr3 = []) => {
    if (arr1.length === 0) return arr3;
    arr3.push(arr1.shift());
    if (arr2.length !== 0) arr3.push(arr2.shift());
    return arrayIntercale(arr1, arr2, arr3);
  };

  const filterIngredientsAndMeasures = () => {
    const currentObject = Object.entries(details[0]);
    const ingredientArray = currentObject.filter((ingredientKey) => ingredientKey[0]
      .includes('strIngredient') && ingredientKey[1] !== '' && ingredientKey[1] !== null);
    const renderIngredients = ingredientArray.map((item) => item[1]);

    const currentObject2 = Object.entries(details[0]);
    const measureArray = currentObject2.filter((measureKey) => measureKey[0]
      .includes('strMeasure') && measureKey[1] !== ' ' && measureKey[1] !== null);
    const renderMeasure = measureArray.map(((item) => item[1]));

    const arrayIntercaled = arrayIntercale(renderIngredients, renderMeasure);
    return arrayIntercaled;
  };

  const finalArray = () => {
    const array = filterIngredientsAndMeasures();
    const shortArrays = [];

    while (array.length > 0) {
      shortArrays.push(array.splice(0, 2));
    }
    const arrayMap = shortArrays.map((item, index) => (
      <p
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {item.toString().replace(',', ' - ')}
      </p>));
    return arrayMap;
  };

  if (details === '') return <h1>Loading</h1>;
  return (
    <div>
      { details.map((item, index) => (
        <ComponentDetailsCard
          key={ index }
          detailItem={ item }
          renderIngredients={ finalArray }
          drinkOrMeal={ drinkOrMeal }
        />
      )) }
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <button data-testid="start-recipe-btn" type="button">Iniciar receita</button>
    </div>
  );
}

ComponentDetails.propTypes = {
  drinkOrMeal: PropTypes.string.isRequired,
};

export default ComponentDetails;
