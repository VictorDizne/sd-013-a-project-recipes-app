import Carousel from 'react-bootstrap/Carousel';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context';

const NUM_RECOMENDATIONS = 6;
const FIRST_SLIDE = 0;
const SECOND_SLIDE = 2;
const THIRD_SLIDE = 4;

function Recomendations({ isMeal }) {
  const { meals, drinks } = useContext(Context);

  const recomendations = (isMeal)
    ? drinks.slice(0, NUM_RECOMENDATIONS)
    : meals.slice(0, NUM_RECOMENDATIONS);

  if (!recomendations.length) return <h1>Loading...</h1>;

  const renderSlideItem = (i) => (
    <Carousel.Item key={ i }>
      <div data-testid={ `${i}-recomendation-card` }>
        <h3 data-testid={ `${i}-recomendation-title` }>
          {isMeal ? drinks[i].strDrink : meals[i].strMeal}
        </h3>
      </div>
      <div data-testid={ `${i + 1}-recomendation-card` }>
        <h3 data-testid={ `${i + 1}-recomendation-title` }>
          {isMeal ? drinks[i + 1].strDrink : meals[i + 1].strMeal}
        </h3>
      </div>
    </Carousel.Item>
  );

  return (
    <Carousel>
      {renderSlideItem(FIRST_SLIDE)}
      {renderSlideItem(SECOND_SLIDE)}
      {renderSlideItem(THIRD_SLIDE)}
    </Carousel>
  );
}

Recomendations.propTypes = {
  isMeal: PropTypes.bool.isRequired,
};

export default Recomendations;
