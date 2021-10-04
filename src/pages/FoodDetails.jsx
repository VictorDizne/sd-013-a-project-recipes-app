import React from 'react';
// import { useLocation, useParams } from 'react-router-dom';
// import { useHistory } from 'react-router';
// import getMealById from '../services/getDrinkId';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FoodDetails() {
  return (
    <section>
      <div>
        <div>
          <img
            data-testid="recipe-photo"
            alt="receita pronta"
          // key={ strMealThumb }
          // src={ strMealThumb }
          />

        </div>
        <button data-testid="share-btn" type="button">Share</button>
        <img src={ blackHeartIcon } alt="favorite-icon" />
        <button data-testid="favorite-btn" type="button">
          <img src={ shareIcon } alt="share-icon" />
        </button>
        <p data-testid="recipe-category" />
        <p data-testid="recipe-title" />

        Food Details
      </div>
      <div>
        <h3>Ingredients</h3>
        <ul>
          {/* <li
            // key={ index }
            // data-testid={ `${index}-ingredient-name-and-measure` }
          /> */}

        </ul>
        <p data-testid="instructions" />
        <h3>Instructions</h3>

        <div>Recomendadas</div>
        <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
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

export default FoodDetails;
