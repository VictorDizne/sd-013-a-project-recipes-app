import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import Context from '../Context/Context';
import Button from '../components/Button';
import Input from '../components/Input';
import FavoriteMeal from '../components/FavoriteMeal';
import '../App.css';

function FoodsProcess(props) {
  // const { id } = useContext(Context);
  const [details, setDetails] = useState();
  const [message, setMessage] = useState(false);
  const [risk, setRisk] = useState('');

  useEffect(() => {
    const { match: { params: { id } } } = props;
    console.log(id);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    async function fetchResult() {
      const result = await (await fetch(url)).json();
      console.log(result, 'result');
      setDetails(result.meals[0]);
    }
    fetchResult();
  }, []);

  const checkboxRisk = ({ target }) => (
    target.checked ? setRisk('.checkbox-risk') : setRisk(''));

  const renderDetails = () => {
    const urlShare = window.location.href;
    if (details !== undefined) {
      return (
        <section>
          <img src={ details.strMealThumb } alt="" data-testid="recipe-photo" />
          <h2 data-testid="recipe-title">{details.strMeal}</h2>
          <Button
            testID="share-btn"
            handleClick={ () => {
              navigator.clipboard.writeText(urlShare);
              setMessage(true);
            } }
          >
            Compartilhar
          </Button>
          { message ? <h5>Link copiado!</h5> : null }
          <FavoriteMeal />

          <ul>
            <h3>Ingredientes</h3>
            {Object.keys(details)
              .filter((detail) => detail.includes('strIngredient'))
              .filter((ing) => details[ing] !== null)
              .map((ingredient, i) => (
                <li
                  key={ i }
                  data-testid={ `${i}-ingredient-name-and-measure` }
                  className={ risk }
                >
                  <Input
                    inputType="checkbox"
                    handleChange={ checkboxRisk }
                    name={ ingredient }
                    id={ ingredient }
                  />
                  {details[`strMeasure${i + 1}`]}
                  {details[`strMeasure${i + 1}`] ? ' of ' : null}
                  {details[ingredient]}
                </li>))}
          </ul>
          <h4 data-testid="recipe-category">{ details.strCategory }</h4>
          <p data-testid="instructions">{ details.strInstructions }</p>
          <Button
            testID="finish-recipe-btn"
            handleClick={ () => {} }
          >
            Finalizar Receita
          </Button>
        </section>
      );
    }
  };

  return (
    <div>
      { details !== null || details !== undefined ? renderDetails() : null }
    </div>
  );
}

FoodsProcess.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FoodsProcess;
