import React from 'react';
import PropTypes from 'prop-types';

function CardRecomend(props) {
  const { recomended, index } = props;
  return (
    <section>
      <div
        data-testid={ `${index}-recomendation-card` }
        className="recomended-drink-info"
        key={ recomended.idDrink }
      >
        <img src={ recomended.strDrinkThumb } alt="foto da bebida" />
        <p>{ recomended.strCategory }</p>
        <h5 data-testid={ `${index}-recomendation-title` }>{ recomended.strDrink }</h5>
      </div>
      {/* <div
        className="recomended-drinks-card"
        data-testid={ `${indice}-recomendation-card` }
      />
      <div className="recomended-card" data-testid={ `${indice}-recomendation-card` }>
        <img src={ drink.strDrinkThumb } alt="drink" data-testid={ `${indice}-card-img` } />
        <p data-testid={ `${indice}-card-name` }>{ drink.strDrink }</p>
      </div> */}
    </section>
  );
}
CardRecomend.defaultProps = {
  recomended: {
    idDrink: '',
    strDrinkThumb: '',
    strCategory: '',
    strDrink: '',
  },
};

CardRecomend.propTypes = {
  recomended: PropTypes.shape({
    idDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
};

export default CardRecomend;
