import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import Button from '../components/Button';

function DrinksRecipies(props) {
  const [details, setDetails] = useState();
  const [message, setMessage] = useState(false);
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
    const urlShare = window.location.href;
    console.log(urlShare, 'pedro');
    if (details !== undefined) {
      return (
        <section>
          <img src={ details.strDrinkThumb } alt="" data-testid="recipe-photo" />
          <h2 data-testid="recipe-title">{ details.strDrink }</h2>
          <Button
            testID="share-btn"
            handleClick={ () => {
              navigator.clipboard.writeText(urlShare);
              setMessage(true);
            } }
          >
            Compartilhar
          </Button>
          { message ? <h4>Link copiado!</h4> : null }
          <Button testID="favorite-btn">Favoritar</Button>
          <ul data-testid="0-ingredient-name-and-measure">
            {Object.keys(details)
              .filter((detail) => detail.includes('strIngredient'))
              .filter((ing) => details[ing] !== null)
              .map((ingredient, i) => (
                <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                  {details[`strMeasure${i + 1}`]}
                  {details[`strMeasure${i + 1}`] ? ' of ' : null}
                  {details[ingredient]}
                </li>))}
          </ul>
          <h4 data-testid="recipe-category">{ details.strAlcoholic }</h4>
          <p data-testid="instructions">{ details.strInstructions }</p>
          <p data-testid="0-recomendation-card">Card</p>
          <Button
            testID="start-recipe-btn"
            className="initRecipes"
            handleClick={ () => history.push(`/bebidas/${id}/in-progress`) }
          >
            Iniciar Receita
          </Button>
          {console.log(details.strDrinkThumb)}
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
