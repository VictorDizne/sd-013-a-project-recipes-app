import PropTypes from 'prop-types';
import React from 'react';
import RecommendedCard from './RecommendedCard';

function Recomendations({ recomendations }) {
  const loading = <p>Loading.......</p>;

  const style = {
    overflow: 'auto',
    whiteSpace: 'nowrap',
  };

  return (
    <ul style={ style }>
      {
        recomendations.length > 0
          ? recomendations
            .map((recommended, index) => (
              <RecommendedCard
                key={ index }
                iterator={ index }
                recommended={ recommended }
              />
            ))
          : loading
      }
    </ul>
  );
}

Recomendations.propTypes = {
  recomendations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Recomendations;
