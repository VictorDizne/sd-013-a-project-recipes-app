import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

function Video({ meal, recipe }) {
  if (!meal) return null;

  const youtubeURL = String(recipe.strYoutube).replace(/watch\?v=/, 'embed/');
  return <ReactPlayer url={ youtubeURL } data-testid="video" />;
}

Video.propTypes = {
  meal: PropTypes.bool.isRequired,
  recipe: PropTypes.shape({
    strYoutube: PropTypes.string.isRequired,
  }).isRequired,
};

export default Video;
