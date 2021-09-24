import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function CardRecomendations({ recomends, maxCards }) {
  const carousel = [];
  const name = useLocation().pathname.includes('bebidas');

  const srcAltTo = (i) => {
    const src = name ? `${recomends[i].strMealThumb}` : `${recomends[i].strDrinkThumb}`;
    const alt = name ? `${recomends[i].strDrink}` : `${recomends[i].strMeal}`;
    const to = name ? `/comidas/${recomends[i].idMeal}`
      : `/bebidas/${recomends[i].idDrink}`;

    return { src, alt, to };
  };

  if (recomends.length > 0) {
    for (let i = 0; i < maxCards; i += 1) {
      const { src, alt, to } = srcAltTo(i);
      carousel.push(
        <Link
          to={ to }
          data-testid={ `${i}-recomendation-card` }
        >
          <div>
            <img
              src={ src }
              alt={ alt }
              key={ i }
            />
            <p>
              {name ? recomends[i].strAlcoholic : recomends[i].strCategory}
            </p>
            <p>
              {name ? recomends[i].strDrink : recomends[i].strMeal}
            </p>
          </div>
        </Link>,
      );
    }
  }
  return (carousel.map((item) => item));
}
