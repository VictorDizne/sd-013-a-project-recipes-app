import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';
import Button from '../components/Button';
import Input from '../components/Input';
import FavoriteMeal from '../components/FavoriteMeal';
import '../App.css';

function FoodsProcess(props) {
  // const { id } = useContext(Context);
  const [details, setDetails] = useState();
  const [message, setMessage] = useState(false);
  const { setFavorite, setId } = useContext(Context);
  const [disabledButton, setdisabledButton] = useState(true);

  useEffect(() => {
    const { match: { params: { id } } } = props;
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    async function fetchResult() {
      const result = await (await fetch(url)).json();
      setDetails(result.meals[0]);
      setFavorite(result.meals[0]);
      setId(result.meals[0].idMeal);
    }
    fetchResult();
  }, []);

  const buttonAbled = () => {
    const arrayIng = Object.keys(details)
      .filter((detail) => detail.includes('strIngredient'))
      .filter((ing) => details[ing]);
    const arrayCheckbox = document.querySelectorAll('input:checked');
    // console.log(arrayCheckbox, 'hello');
    // console.log(arrayIng);
    if (arrayCheckbox.length === arrayIng.length) {
      return setdisabledButton(false);
    }
    return setdisabledButton(true);
  };

  const checkboxRisk = ({ target }) => {
    buttonAbled();
    const parent = target.parentNode;
    const li = parent.parentNode;
    return target.checked
      ? li.classList.add('checkbox-risk')
      : li.classList.remove('checkbox-risk');
  };

  const renderDetails = () => {
    const urlLocal = window.location.href;
    const urlShare = urlLocal.split('/in')[0];

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
              .filter((ing) => details[ing])
              .map((ingredient, i) => (
                <li
                  key={ i }
                  data-testid={ `${i}-ingredient-step` }
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
          <Link to="/receitas-feitas">
            <Button
              testID="finish-recipe-btn"
              disabled={ disabledButton }
            >
              Finalizar Receita
            </Button>
          </Link>
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
