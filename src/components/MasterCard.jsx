import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ShareButton from './ShareButton';
import LikeButton from './LikeButton';

const Img = styled.img`
  max-width: 45vw;
`;

const RecipeCard = styled.div`
  /* background-color: #ffffff; */
  border-radius: 6px;
  box-shadow: 1px 1px 3px 1px #ffffff67;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  border-radius: 6px;
  border: 1px solid #ffffff75;
  margin-bottom: 10px;

  img {
    border-radius: 6px 6px 0px 0px;
    width: 45vw;
  }

  h3 {
    color: #ffffff;
    padding: 4px 6px;
    max-width: 45vw;
  }
`;

function MasterCard(props) {
  const {
    // props usadas em todos os tipos de card
    cardType,
    title,
    src,
    index,
    category,
    // props usadas nos favoritos
    id,
    area,
    type,
    recipe,
    refreshFav,
    // props usadas nas receitas feitas
    tags = [],
    doneDate,
    // prop usada nas receitas feitas e favoritas
    favOrDone = false,
    testID,
    alcoholicOrNot,
  } = props;

  const favBtn = () => (
    <LikeButton
      id={ id }
      favOrDone={ favOrDone }
      idx={ index }
      recipe={ recipe }
      refreshFav={ refreshFav }
    />
  );

  const shareButton = () => (
    <ShareButton
      id={ id }
      type={ type }
      testID={ testID }
      index={ index }
    />
  );

  const recipeCard = () => (
    <RecipeCard data-testid={ `${index}-recipe-card` }>
      <img src={ src } alt={ title } data-testid={ `${index}-card-img` } />
      <h3 data-testid={ `${index}-card-name` }>{ title }</h3>
    </RecipeCard>
  );

  const ingredientCard = () => (
    <RecipeCard
      className="ingredientCard"
      data-testid={ `${index}-ingredient-card` }
    >
      <img
        className="ingredientImg"
        data-testid={ `${index}-card-img` }
        src={ src }
        alt={ title }
      />
      <h3
        className="ingredientName"
        data-testid={ `${index}-card-name` }
      >
        { title }
      </h3>
    </RecipeCard>
  );

  const recomendedCard = () => (
    <div data-testid={ `${index}-recomendation-card` }>
      <Img src={ src } alt={ title } data-testid={ `${index}-card-img` } />
      <p>{ category }</p>
      <h3 data-testid={ `${index}-recomendation-title` }>{ title }</h3>
    </div>
  );

  const favoritedCard = () => (
    <div className="favoritedCard">
      <Link
        to={ `${type}s/${id}` }
      >
        <Img
          data-testid={ `${index}-horizontal-image` }
          src={ src }
          alt={ title }
          className="favCardImg"
        />
      </Link>
      <div className="favCardDetails">
        <div className="category-share-container">
          <span
            className="category"
            data-testid={ `${index}-horizontal-top-text` }
          >
            { type === 'comida'
              ? `${area} - ${category}`
              : `${alcoholicOrNot}` }
          </span>
          { shareButton() }
          { favBtn() }
        </div>
        <Link
          to={ `${type}s/${id}` }
          className="favNameLink"
          data-testid={ `${index}-horizontal-name` }
        >
          <span className="favName">
            { title }
          </span>
        </Link>
      </div>
    </div>
  );

  const doneRecipe = () => (
    <div className="doneCard">
      <Link
        to={ `/${type}s/${id}` }
      >
        <Img
          data-testid={ `${index}-horizontal-image` }
          src={ src }
          alt={ title }
          className="favCardImg"
        />
      </Link>
      <div className="favCardDetails">
        <div className="share">
          <span
            className="category"
            data-testid={ `${index}-horizontal-top-text` }
          >
            { type === 'comida'
              ? `${area} - ${category}`
              : `${alcoholicOrNot}` }
          </span>
          { shareButton() }
        </div>
        <Link
          to={ `/${type}s/${id}` }
          className="favNameLink"
          data-testid={ `${index}-horizontal-name` }
        >
          <span className="favName">
            { title }
          </span>
        </Link>
        <span
          className="doneDate"
          data-testid={ `${index}-horizontal-done-date` }
        >
          { `Feita em: ${doneDate}` }
        </span>
        <div className="favTags">
          {
            (type === 'comida') && (tags.length > 0)
              ? (
                (tags.slice(0, 2)).map((tag, tagIdx) => (
                  <span
                    key={ tagIdx }
                    className="favTag"
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    { tag }
                  </span>
                ))
              ) : (
                <> </>
              )
          }
        </div>
      </div>
    </div>
  );

  const renderObject = {
    foodRecipe: recipeCard(),
    ingredient: ingredientCard(),
    drinkRecipe: recipeCard(),
    foodRecomended: recomendedCard(),
    drinkRecomended: recomendedCard(),
    favorited: favoritedCard(),
    doneRecipe: doneRecipe(),
  };

  return (
    renderObject[cardType]
  );
}

const { string } = PropTypes;

MasterCard.propTypes = {
  index: string,
  title: string,
  url: string,
}.isRequired;

export default MasterCard;
