import React from 'react';
import PropTypes from 'prop-types';

function FavoriteButton(props) {
  const { setFavoriteHeart, favoriteHeartState } = props;
  const style = {};
  if (favoriteHeartState) {
    style.backgroundColor = 'red';
  } else {
    style.backgroundColor = 'grey';
  }

  return (
    <button
      type="button"
      style={ style }
      onClick={ setFavoriteHeart(!favoriteHeartState) }
    >
      ICON

    </button>
  );
}

FavoriteButton.propTypes = {
  setFavoriteHeart: PropTypes.func.isRequired,
  favoriteHeartState: PropTypes.bool.isRequired,
};

export default FavoriteButton;
