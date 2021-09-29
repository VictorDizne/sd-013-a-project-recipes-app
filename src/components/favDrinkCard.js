import React from 'react';

function FavDrinkCard(r) {
  return (
    <div>
      <img
        alt="Food"
        src={ r.r.image }
      />
      <h2>{ r.r.name }</h2>
      <p>{ r.r.alcoholicOrNot }</p>
    </div>
  );
}

export default FavDrinkCard;
