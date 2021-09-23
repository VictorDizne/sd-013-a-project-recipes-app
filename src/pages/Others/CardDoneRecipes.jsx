import React, { useEffect, useState } from 'react';
import '../../CSS/CardDoneRecipes.css';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import ShareIcon from '../../images/shareIcon.svg';

const CardDoneRecipes = ({ cards }) => {
  const shareRecipe = ({ currentTarget }, recipe) => {
    const page = recipe.type === 'comida' ? 'comidas' : 'bebidas';
    const threeSeconds = 3000;
    const { protocol, host } = window.location;
    copy(`${protocol}//${host}/${page}/${recipe.id}`);
    const copyMsg = currentTarget.previousSibling;
    copyMsg.classList.toggle('invisible');
    setTimeout(() => copyMsg.classList.toggle('invisible'), threeSeconds);
  };

  const getURL = ({ type, id }) => {
    const page = type === 'comida' ? 'comidas' : 'bebidas';
    return `/${page}/${id}`;
  };

  const [card, setCard] = useState([]);

  useEffect(() => {
    setCard(cards.map((recipe, index) => (
      <section key={ recipe.id } className="done-recipes-card-container">
        <div className="done-recipes-card-image">
          <Link to={ getURL(recipe) }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt="recipe-thumbnail"
            />
          </Link>
        </div>

        <div className="done-recipes-card-info">

          <div className="done-recipes-card-category_share">
            <p data-testid={ `${index}-horizontal-top-text` }>
              { recipe.type === 'comida'
                ? `${recipe.area} - ${recipe.category}`
                : recipe.alcoholicOrNot }
            </p>

            <span className="done-copied-message invisible">Link copiado!</span>

            <button type="button" onClick={ (e) => shareRecipe(e, recipe) }>
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ ShareIcon }
                alt="share"
              />
            </button>
          </div>

          <Link to={ getURL(recipe) }>
            <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
          <div className="done-recipes-card-category">
            { recipe.tags.map((tag) => (
              <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>{ tag }</p>
            )) }
          </div>
        </div>
      </section>
    )));
  }, [cards]);
  console.log(card);

  if (!card.length) {
    return null;
  }

  return card;
};

export default CardDoneRecipes;
