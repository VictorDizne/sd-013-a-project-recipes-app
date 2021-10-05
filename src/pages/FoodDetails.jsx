import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useLocation, useParams } from 'react-router-dom';
// import { useHistory } from 'react-router';
// import getMealById from '../services/getDrinkId';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import getFoodId from '../services/getFoodId';
import '../PaginasCss/StartRecipe.css';

function FoodDetails(props) {
  const { match: { params: { id } } } = props;

  const [food, setFood] = useState({});
  console.log(food);

  useEffect(() => {
    const getFood = async () => {
      const responseFood = await getFoodId(id);
      setFood(responseFood[0]);
    };
    getFood();
  }, [id]);
  return (
    <section>
      <div>
        <div>
          <img
            data-testid="recipe-photo"
            alt="receita pronta"
          />
        </div>
        <button
          data-testid="share-btn"
          type="button"
        >
          <img src={ shareIcon } alt="share-icon" />
        </button>
        <button data-testid="favorite-btn" type="button">
          <img src={ blackHeartIcon } alt="favorite-icon" />
        </button>
        <p data-testid="recipe-category" />
        <p data-testid="recipe-title" />

        Food Details
      </div>
      <div>
        <h3>Ingredients</h3>
        <ul />
        <p data-testid="instructions" />
        <h3>Instructions</h3>

        <div>Recomendadas</div>
        <Link to="/comidas/:id/in-progress">
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
          title="Youtube Video Player"
          frameBorder="0"
          data-testid="video"
          width="548"
          height="421"
        />
      </div>
    </section>

  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default FoodDetails;
