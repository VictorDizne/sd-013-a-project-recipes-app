import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card as CardElement,
  CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

function Card({ index, recipeImage, recipeName, link }) {
  return (
    <CardElement
      sx={ { maxWidth: 360, margin: 2, align: 'center' } }
      data-testid={ `${index}-recipe-card` }
    >
      <CardActionArea>
        <Link to={ link }>
          <CardMedia
            component="img"
            height="140"
            image={ recipeImage }
            alt={ `${recipeName} image` }
            data-testid={ `${index}-card-img` }
          />
        </Link>
        <CardContent>
          <Link to={ link }>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              data-testid={ `${index}-card-name` }
            >
              {recipeName}
            </Typography>
          </Link>
        </CardContent>
      </CardActionArea>
    </CardElement>
  );
  // <Link
  //   to={ link }
  //   data-testid={ `${index}-recipe-card` }
  // >

  //   <div className="recipe-card">

  //     <img
  //       src={ recipeImage }
  //       alt={ recipeName }
  //       data-testid={ `${index}-card-img` }
  //       style={ { width: '100vw', maxWidth: '500px' } }
  //     />

  //     <div data-testid={ `${index}-card-name` }>
  //       {recipeName}
  //     </div>
  //   </div>
  // </Link>
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  recipeImage: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Card;
