import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ShareButton from './ShareButton';
import LikeButton from './LikeButton';

import RecipeCard from './styles/RecipeCard';
import FavRecipeCard from './styles/FavRecipeCard';
import DoneRecipeCard from './styles/DoneRecipeCard';

const Img = styled.img`
  max-width: 45vw;
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
    <FavRecipeCard className="favoritedCard">
      <div className="favCardImage">

        <Link
          to={ `${type}s/${id}` }
        >
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ src }
            alt={ title }
            className="favCardImg"
          />
        </Link>

      </div>

      <div className="favCardDetails">

        <div className="category-title">

          <h5
            className="category"
            data-testid={ `${index}-horizontal-top-text` }
          >
            { type === 'comida'
              ? `${area} - ${category}`
              : `${alcoholicOrNot}` }
          </h5>

          <Link
            to={ `${type}s/${id}` }
            className="favNameLink"
            data-testid={ `${index}-horizontal-name` }
          >
            <h2 className="favName">
              { title }
            </h2>

          </Link>

        </div>

        <div className="share-fav-container">

          { shareButton() }
          { favBtn() }

        </div>

      </div>
    </FavRecipeCard>
  );

  const doneRecipe = () => (
    <DoneRecipeCard className="doneCard">

      <div className="favCardImage">

        <Link
          to={ `/${type}s/${id}` }
        >
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ src }
            alt={ title }
            className="favCardImg"
          />
        </Link>

      </div>

      <div className="favCardDetails">

        <div className="share">
          <h5
            className="category"
            data-testid={ `${index}-horizontal-top-text` }
          >
            { type === 'comida'
              ? `${area} - ${category}`
              : `${alcoholicOrNot}` }
          </h5>

          { shareButton() }

        </div>

        <div className="infos">

          <Link
            to={ `/${type}s/${id}` }
            className="favNameLink"
            data-testid={ `${index}-horizontal-name` }
          >
            <h2 className="favName">
              { title }
            </h2>
          </Link>

          <h5
            className="doneDate"
            data-testid={ `${index}-horizontal-done-date` }
          >
            { `Feita em: ${doneDate}` }
          </h5>

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
    </DoneRecipeCard>
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
