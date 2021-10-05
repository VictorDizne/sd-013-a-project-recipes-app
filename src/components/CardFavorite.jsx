import React, { useState } from 'react';

const CardFavorite = ({name, category, image, area}) => {
  const [favRecipes, setFavRecipes] = useState(
    JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
  );

  return (
    <div className="main">
      <img src={ image } alt={ name } className="imageFood" />
      <p>{name}</p>
      <p>{category}</p>
      <p>{area}</p>

    </div>
  );
};

export default CardFavorite;
