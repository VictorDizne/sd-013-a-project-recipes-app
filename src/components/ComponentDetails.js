import React, { useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import recipeContext from '../context';
import ComponentDetailsCard from './ComponentDetailsCard';
import ComponentSugestions from './ComponentSugestions';

function ComponentDetails() {
  const { fetchDetails, details, dataForFetch: { currentPage },
    handleCurrentPage } = useContext(recipeContext).ContextDetails;
  const { id } = useParams();
  const history = useHistory();

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

  const handleClick = () => {
    if (currentPage === 'themealdb') history.push(`${id}/in-progress`);
    if (currentPage === 'thecocktaildb') history.push(`${id}/in-progress`);
  };

  if (details === '') return <h1>Loading</h1>;
  return (
    <div>
      { details.map((item, index) => (
        <ComponentDetailsCard
          key={ index }
          detailItem={ item }
          renderIngredients={ finalArray }
        />
      )) }
      <ComponentSugestions />
      <div className="btn-container">
        <button
          className="btn-start"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ handleClick }
        >
          Iniciar receita
        </button>
      </div>
    </div>
  );
}

export default ComponentDetails;
