import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function StartRecipeButton({ id, onClick, title, page }) {
  return (
    <Link to={ `/${page}/${id}/in-progress` }>
      <button
        style={ { position: 'fixed', bottom: '0px' } }
        type="button"
        data-testid="start-recipe-btn"
        onClick={ onClick }
      >
        {title}
      </button>
    </Link>
  );
}

StartRecipeButton.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};
