import React from 'react';
import { Link } from 'react-router-dom';

export default function StartRecipeButton({ id, onClick, title, page }) {
  return (
    <Link to={`/${page}/${id}/in-progress`}>
      <button 
        style={ { position: 'fixed', bottom: '0px' } }
        type="button" data-testid="start-recipe-btn"
        onClick={ onClick }
      >
        {title}
      </button>
    </Link>
  );
}