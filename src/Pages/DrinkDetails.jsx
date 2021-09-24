import React from 'react';
import PropTypes from 'prop-types';
import useApiId from '../hooks/useApiId';

function DrinkDetails(props) {
  const { match: { params: { id } } } = props;

  const data = useApiId('thecocktaildb', id);

  console.log(data);

  return (
    <h1>DrinkDetails</h1>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default DrinkDetails;
