import React from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function ReadyReceipesCards() {
  return (
    <section>
      <Link to={ `/comidas${id}` }>
        <img data-testid={ `${index}-horizontal-image` } src="" alt="" />
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        texto da categoria da receita
      </p>
      <Link to={ `/comidas${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>
          texto do nome da receita
        </p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>
        texto da data que a receita foi feita
      </p>
      <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
        <img src={ shareIcon } alt="drink-icon" />
      </button>
      <span data-testid={ `${index}-${tagName}-horizontal-tag` }>
        TAGS
      </span>
    </section>
  );
}

export default ReadyReceipesCards;
