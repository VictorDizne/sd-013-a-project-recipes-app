import React /* { useState, useEffect } */ from 'react';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

const ReceitasFavoritas = () => (
  /* const [setFavorites] = useState('');

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(favoriteRecipes);
  }, []); */
  // [{ id, type, area, category, alcoholicOrNot, name, image }]

  <div>
    <HeaderWithoutSearch page="Receitas Favoritas" />
  </div>
);
/* {favorites.forEach((recipe) => {
      if (recipe.type === 'meal') {
        return (
          <button type="submit" key="">
            <img src={ recipe.image } alt={ recipe.name } />
            <h3>{ recipe.name }</h3>
            <h3>{ recipe.category }</h3>
            <h3>{ recipe.area }</h3>
          </button>
        );
      }
})} */
export default ReceitasFavoritas;
