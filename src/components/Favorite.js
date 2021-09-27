import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import heartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function Favorite({ id }) {
  const [fav, setFav] = useState('');
  const [Icon, setIcon] = useState('');
  useEffect(() => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    console.log(favorite);
    const img = favorite.some((favo) => favo.id === id);
    setFav({ img });
  }, [id]);
  useEffect(() => {
    if (fav.img) {
      setIcon({ NewIcon: blackHeartIcon });
    } else {
      setIcon({ NewIcon: heartIcon });
    }
  }, [fav]);

  const controlFav = () => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (fav.img) {
      const removeFavorite = favorite.filter((item) => item.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
      setFav({ img: false });
    } else {
      const item = { chave: 'sla' }; // receber o item
      const adicionaFavorite = [...favorite, item];
      localStorage.setItem('favoriteRecipes', JSON.stringify(adicionaFavorite));
      setFav({ img: true });
    }
  };
  return (
    <button type="button" onClick={ controlFav }>
      <img
        src={ Icon.NewIcon }
        alt="favorite"
        data-testid="favorite-btn"
        style={ { width: 40 } }
      />
    </button>
  );
}
Favorite.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Favorite;
