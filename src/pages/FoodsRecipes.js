import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import Button from '../components/Button';

function FoodsRecipies(props) {
  const [details, setDetails] = useState();
  const history = useHistory();
  const { match: { params: { id } } } = props;
  useEffect(() => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    async function fetchResult() {
      const result = await (await fetch(url)).json();
      const obj = result.meals;
      setDetails(obj[0]);
    }
    fetchResult();
  }, []);

  const renderDetails = () => {
    if (details !== undefined) {
      return (
        <section>
          <img src={ details.strMealThumb } alt="" data-testid="recipe-photo" />
          <h2 data-testid="recipe-title">{details.strMeal}</h2>
          <Button testID="share-btn">Compartilhar</Button>
          <Button testID="favorite-btn">Favoritar</Button>
          <ul data-testid="0-ingredient-name-and-measure">
            {Object.keys(details)
              .filter((detail) => detail.includes('strIngredient'))
              .filter((ing) => details[ing] !== '')
              .map((ingredient, i) => (
                <li key={ i }>
                  {details[`strMeasure${i + 1}`]}
                  {' of '}
                  {details[ingredient]}
                </li>))}
          </ul>
          <h4 data-testid="recipe-category">{ details.strCategory }</h4>
          <p data-testid="instructions">{ details.strInstructions }</p>
          <iframe src={ details.strYoutube } data-testid="video" title=" video teste" />
          <p data-testid="0-recomendation-card">card</p>
          <Button
            testID="start-recipe-btn"
            className="initRecipes"
            handleClick={ () => history.push(`/comidas/${id}/in-progress`) }
          >
            Iniciar Receita
          </Button>
          {console.log(details.strInstructions)}
          {console.log(details)}
        </section>
      );
    }
  };

  return (
    <div>
      { renderDetails() }
    </div>
  );
}

FoodsRecipies.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FoodsRecipies;
