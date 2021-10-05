import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import removeFromFavorites from '../services/removeFromFavorites';
import addToFavorites from '../services/addToFavorites';

function FavoriteCards({ recipe, index, handleShare }) {
  const [favorite, setFavorite] = useState(false);
  let recipeType;
  const { alcoholicOrNot, area, category,
    id, image, name, type } = recipe;
  // Checa se estamos fazendo um card de bebida ou de comida
  if (type === 'bebida') {
    recipeType = 'bebidas';
  } else {
    recipeType = 'comidas';
  }
  useEffect(() => {
    // Checa se a receita é favorita, para que o coracao fique preenchido ao carregar a página
    // Primeiro busca a chave de favoritos do LocalStorage
    if (localStorage.getItem('favoriteRecipes')) {
      const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      // Seta o favoritos de acordo com o resultado do some, assim se algum id corresponder ao
      // da receita atual, o resutado e true, o que faz com que o coracao seja preenchido
      setFavorite(currentFavorites.some((favoriteRecipe) => favoriteRecipe.id === id));
    }
  }, [id]);

  function toggleFavorite() {
    if (favorite) {
      // Remove dos favoritos e nega o valor do estado para que o coracao mude de cor
      removeFromFavorites(id);
      setFavorite(!favorite);
    } else {
      // Adiciona aos favoritos e nega o valor do estado para que o coracao mude de cor
      if (type === 'bebida') {
        addToFavorites('Drink', recipe);
      } else {
        addToFavorites('Meal', recipe);
      }
      setFavorite(!favorite);
    }
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
      <p>Categoria:</p>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { type === 'bebida' ? alcoholicOrNot : `${area} - ${category}` }
      </p>
      <button
        type="button"
        onClick={ () => handleShare(type, id) }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="share button"
        />
      </button>
      <button
        className="detail-button"
        type="button"
        onClick={ toggleFavorite }
      >
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          alt="Favoritar"
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
        />
      </button>
    </div>
  );
}

FavoriteCards.propTypes = {
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleShare: PropTypes.func.isRequired,
};

export default FavoriteCards;
