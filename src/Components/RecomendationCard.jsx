import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { Card, CardGroup } from 'react-bootstrap';

const RecomendationCards = ({ itens, isMeal, cardsLimit }) => {
  const carousel = [];
  console.log(carousel);
  // pathname = isMeal ? `/bebidas/${item.idDrink}` : `/comidas/${item.idMeal}`;
  const imgAltLink = (index) => {
    const img = isMeal
      ? `${itens[index].strDrinkThumb}`
      : `${itens[index].strMealThumb}`;
    const alt = isMeal
      ? `${itens[index].strDrink}`
      : `${itens[index].strMeal}`;
    const link = isMeal
      ? `/bebidas/${itens[index].idDrink}`
      : `/comidas/${itens[index].idMeal}`;
    return { img, alt, link };
  };

  if (itens.length > 0) {
    for (let i = 0; i < cardsLimit; i += 1) {
      const { img, alt, link } = imgAltLink(i);
      carousel.push(
        <CardGroup key={ i }>
          <Card style={ { width: '14rem' } }>
            <Card.Body>
              <Link
                to={ link }
                data-testid={ `${i}-recomendation-card` }
              >
                <Card.Img src={ img } key={ i } alt={ alt } />
              </Link>
              <Card.Title data-testid={ `${i}-recomendation-title` }>
                { isMeal ? itens[i].strDrink : itens[i].strMeal }
              </Card.Title>
              <Card.Subtitle>
                { isMeal ? itens[i].strAlcoholic : itens[i].strCategory }
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </CardGroup>,
      );
    }
  }
  return (carousel.map((item) => item));
};

// const RecomendationCard = ({ item, index, pathname, isMeal }) => {
// pathname = isMeal ? `/bebidas/${item.idDrink}` : `/comidas/${item.idMeal}`;

//   return (
//     <div data-testid={ `${index}-recomendation-card` } key={ index }>
//       <Link to={ pathname }>
//         <img
//           src={ item.strMealThumb || item.strDrinkThumb }
//           alt={ index }
//           width="200px"
//         />
//         <h2>{ item.strMeal || item.strDrink }</h2>
//       </Link>
//     </div>
//   );
// };

// RecomendationCard.propTypes = {
//   item: PropTypes.shape({
//     idMeal: PropTypes.number,
//     idDrink: PropTypes.number,
//     strMealThumb: PropTypes.string,
//     strDrinkThumb: PropTypes.string,
//     strMeal: PropTypes.string,
//     strDrink: PropTypes.string,
//   }),
//   index: PropTypes.number.isRequired,
//   pathname: PropTypes.string.isRequired,
//   isMeal: PropTypes.bool.isRequired,
// };

// RecomendationCard.defaultProps = {
//   item: {
//     idMeal: null,
//     idDrink: null,
//     strMealThumb: null,
//     strDrinkThumb: null,
//     strMeal: null,
//     strDrink: null,
//   },
// };

export default RecomendationCards;
