import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';
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
        <CardGroup key={ i }>
          <Card style={ { width: '14rem' } }>
            <Card.Body>
              <Link
                to={ to }
                data-testid={ `${i}-recomendation-card` }
              >
                <Card.Img variant="top" src={ src } key={ i } alt={ alt } />
              </Link>
              <Card.Title data-testid={ `${i}-recomendation-title` }>
                {name
                  ? recomends[i].strMeal : recomends[i].strDrink}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {name
                  ? recomends[i].strCategory : recomends[i].strAlcoholic}
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </CardGroup>,
      );
    }
  }
  return (carousel.map((item) => item));
}
