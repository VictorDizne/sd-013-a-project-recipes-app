import React from 'react';
import PropTypes from 'prop-types';
import './css/RecomendationCard.css';
// import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

const RecomendationCard = ({ name, thumb, index }) => (
  // <Card
  //   sx={ { maxWidth: 180 } }
  //   data-testid={ `${index}-recipe-card` }
  // >
  //   <CardActionArea>
  //     <CardMedia
  //       component="img"
  //       height="140"
  //       image={ thumb }
  //       alt={ `${name} thumbnail` }
  //       data-testid={ `${index}-recomendation-card` }
  //     />

  //     <CardContent>

  //       <Typography
  //         gutterBottom
  //         variant="h5"
  //         component="h2"
  //         data-testid={ `${index}-recomendation-title` }
  //       >
  //         {name}
  //       </Typography>

  //     </CardContent>
  //   </CardActionArea>
  // </Card>
  <div className="recomendation-item">
    <h1 data-testid={ `${index}-recomendation-title` }>{ name }</h1>
    <img
      data-testid={ `${index}-recomendation-card` }
      src={ thumb }
      alt={ `${name} thumbnail` }
    />
  </div>
);

RecomendationCard.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecomendationCard;
