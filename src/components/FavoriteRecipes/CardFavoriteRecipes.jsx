import React, { useEffect, useState, useCallback } from 'react';
import '../../CSS/CardFavoriteRecipes.css';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ShareIcon from '../../images/shareIcon.svg';
import BlackHeartIcon from '../../images/blackHeartIcon.svg';

const CardFavoriteRecipes = ({ cards }) => {
  const shareRecipe = ({ currentTarget }, recipe) => {
    const page = recipe.type === 'comida' ? 'comidas' : 'bebidas';
    const threeSeconds = 3000;
    const { protocol, host } = window.location;
    copy(`${protocol}//${host}/${page}/${recipe.id}`);
    const copyMsg = currentTarget.previousSibling;
    copyMsg.classList.toggle('invisible');
    setTimeout(() => copyMsg.classList.toggle('invisible'), threeSeconds);
  };

  const dispatch = useDispatch();
  const FavRecipes = useSelector(({ recipes }) => recipes.favoriteRecipes);

  const removeFavorite = useCallback((recipe) => {
    const { id } = recipe;
    const payload = FavRecipes.filter((rec) => id !== rec.id);
    dispatch({ type: 'UPDATE_FAVORITES', payload });
  }, [FavRecipes, dispatch]);

  const getURL = ({ type, id }) => {
    const page = type === 'comida' ? 'comidas' : 'bebidas';
    return `/${page}/${id}`;
  };

  const [card, setCard] = useState([]);

  useEffect(() => {
    if (!cards) return;

    setCard(cards.map((recipe, index) => (
      <section key={ recipe.id } className="fav-recipes-card-container">

        <div className="fav-recipes-card-image">
          <Link to={ getURL(recipe) }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt="recipe-thumbnail"
            />
          </Link>
        </div>

        <div className="fav-recipes-card-info">

          <div className="fav-recipes-card-category_share">
            <p data-testid={ `${index}-horizontal-top-text` }>
              { recipe.type === 'comida'
                ? `${recipe.area} - ${recipe.category}`
                : recipe.alcoholicOrNot }
            </p>

            <span className="fav-copied-message invisible">Link copiado!</span>

            <button type="button" onClick={ (e) => shareRecipe(e, recipe) }>
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ ShareIcon }
                alt="share"
              />
            </button>

            <button type="button" onClick={ () => removeFavorite(recipe) }>
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ BlackHeartIcon }
                alt="favorite"
              />
            </button>
          </div>

          <Link to={ getURL(recipe) }>
            <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
          </Link>

        </div>

      </section>
    )));
  }, [removeFavorite, cards]);
  console.log(card);

  if (!card.length) {
    return null;
  }

  return card;
};

export default CardFavoriteRecipes;
