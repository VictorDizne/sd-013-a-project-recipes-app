import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import Button from '../components/Button';

function DrinksRecipies(props) {
  const [details, setDetails] = useState();
  const history = useHistory();
  const { match: { params: { id } } } = props;
  useEffect(() => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    async function fetchResult() {
      const result = await (await fetch(url)).json();
      const obj = result.drinks;
      setDetails(obj[0]);
    }
    fetchResult();
  }, []);

  const renderDetails = () => {
    if (details !== undefined) {
      return (
        <section>
          <img src={ details.srtDrinkThumb } alt="" data-testid="recipe-photo" />
          <h2 data-testid="recipe-title">{ details.srtDrink }</h2>
          <Button testID="share-btn">Compartilhar</Button>
          <Button testID="favorite-btn">Favoritar</Button>
          <ul data-testid="0-ingredient-name-and-measure">
            <li>boa</li>
          </ul>
          <h4 data-testid="recipe-category">{ details.srtCategory }</h4>
          <p data-testid="instructions">{ details.srtInstructions }</p>
          <p data-testid="0-recomendation-card">Card</p>
          <Button
            testID="start-recipe-btn"
            className="initRecipes"
            handleClick={ () => history.push(`/bebidas/${id}/in-progress`) }
          >
            Iniciar Receita
          </Button>
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

DrinksRecipies.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinksRecipies;
