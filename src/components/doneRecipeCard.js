import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipeCard({ recipe, index }) {
  let recipeType;
  const { alcoholicOrNot, area, category, doneDate,
    id, image, name, tags, type } = recipe;
  // Checa se estamos fazendo um card de bebida ou de comida
  if (type === 'bebida') {
    recipeType = 'bebidas';
  } else {
    recipeType = 'comidas';
  }
  function shareRecipeDetails() {
    copy(`http://localhost:3000/${recipeType}/${id}`);
    global.alert('Link copiado!');
  }
  // Checa se existem tags na receita e as retorna
  function showTags(recipeTags, tagIndex) {
    if (recipeTags) {
      console.log(tags);
      return recipeTags
        .map((tagName, key) => (
          <p
            key={ key }
            className="tag-name"
            data-testid={ `${tagIndex}-${tagName}-horizontal-tag` }
          >
            { tagName }
          </p>));
    }
    return null;
  }
  // Retorna o cartão completo
  return (
    <div className="eachFood">
      <Link to={ `/${recipeType}/${id}` }>
        <img
          className="foodImage"
          src={ image }
          alt="Recipe thumbnail"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <Link to={ `/${recipeType}/${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>
          { name }
        </p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>
        Preparada em:
        { doneDate }
      </p>
      <p>Categoria:</p>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { type === 'bebida' ? alcoholicOrNot : `${area} - ${category}` }
      </p>
      <p>
        Tags:
      </p>
      { showTags(tags, index) }
      <button
        type="button"
        onClick={ shareRecipeDetails }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="share button"
        />
      </button>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
};
const noinfo = 'No info';
DoneRecipeCard.defaultProps = {
  recipe: PropTypes.shape({
    alcoholicOrNot: noinfo,
    area: noinfo,
    category: noinfo,
    doneDate: noinfo,
    id: noinfo,
    image: noinfo,
    name: noinfo,
    tags: [noinfo],
    type: noinfo,
  }),
};

export default DoneRecipeCard;
