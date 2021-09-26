import React from 'react';
import PropTypes from 'prop-types';
import useApiId from '../hooks/useApiId';

function FoodDetails(props) {
  const { match: { params: { id } } } = props;

  const data = useApiId('themealdb', id);

  console.log(data);

  return (
    <div>
      <h1>FoodDetails</h1>
    </div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default FoodDetails;
