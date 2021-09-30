import PropTypes from 'prop-types';
import React from 'react';
import { useHistory, useLocation, Redirect } from 'react-router-dom';

export default function ReciperCard({ name, index, img, idRecipe }) {
  const history = useHistory();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === '/explorar/comidas/area') {
      // eturn <Redirect to={ `/comidas/${idRecipe}` } />;
      history.push(`/comidas/${idRecipe}`);
    } else {
      history.push(`${location.pathname}/${idRecipe}`);
    }
  };

  return (
    <button
      type="button"
      data-testid={ `${index}-recipe-card` }
      className="card"
      onClick={ handleClick }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ `${img}/preview` }
        alt={ name }
        className="imgThumb"
      />
      <p data-testid={ `${index}-card-name` }>{ name }</p>
    </button>
  );
}

ReciperCard.propTypes = {
  img: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  key: PropTypes.number,
}.isRequired;
