import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import GetDrinkId from '../services/getDrinkId';
import CardRecomend from './CardRecomend';
import '../PaginasCss/StartRecipe.css';

function DrinkDetails(props) {
  const { match: { params: { id } } } = props;

  const [drink, setDrink] = useState({});
  console.log(drink);

  useEffect(() => {
    const getDrink = async () => {
      const responseDrink = await GetDrinkId(id);
      setDrink(responseDrink[0]);
    };
    getDrink();
  }, [id]);

  return (
    <section>
      <div>
        <img
          data-testid="recipe-photo"
          alt="receita pronta"
        />
        <button
          data-testid="share-btn"
          type="button"
          key={ shareIcon }
        >
          <img src={ shareIcon } alt="share-icon" />
        </button>
        <button
          data-testid="favorite-btn"
          type="button"
          key={ blackHeartIcon }

        >
          <img src={ blackHeartIcon } alt="favorite-icon" />
        </button>
        <p data-testid="recipe-category" />
      </div>
      <div>
        <ul>
          <li
            data-testid="`$-ingredient-name-and-measure`"
          />

        </ul>
        <p data-testid="instructions" />
        <h3>Instructions</h3>

        <div>
          <CardRecomend />
        </div>
        <Link to="/bebidas/:id/in-progress">
          <button
            className="start-recipe"
            data-testid="start-recipe-btn"
            type="button"
          >
            Iniciar Receita
          </button>
        </Link>
      </div>
      <div>
        <iframe
          src=""
          title="video"
        />
      </div>
    </section>

  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinkDetails;
