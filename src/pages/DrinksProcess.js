import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Context from '../Context/Context';
import Button from '../components/Button';
import Input from '../components/Input';
import FavoriteDrink from '../components/FavoriteDrink';
// import useFetchRecipes from '../Hooks/useFetchRecipes';
import '../App.css';

function DrinksProcess(props) {
  // const { id } = useContext(Context);
  const [details, setDetails] = useState();
  const [message, setMessage] = useState(false);
  const [risk, setRisk] = useState('');

  useEffect(() => {
    const { match: { params: { id } } } = props;
    console.log(id);
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    async function fetchResult() {
      const result = await (await fetch(url)).json();
      console.log(result, 'result');
      setDetails(result.drinks[0]);
    }
    fetchResult();
  }, []);

  const checkboxRisk = ({ target }) => (
    target.checked ? setRisk('.checkbox-risk') : setRisk(''));

  const renderDetails = () => {
    console.log(details);
    const urlShare = window.location.href;
    if (details !== undefined) {
      return (
        <section>
          <img src={ details.strDrinkThumb } alt="" data-testid="recipe-photo" />
          <h2 data-testid="recipe-title">{ details.strDrink }</h2>
          <Button
            testID="share-btn"
            handleClick={ () => {
              navigator.clipboard.writeText(urlShare);
              setMessage(true);
            } }
          >
            Compartilhar
          </Button>
          { message ? <h4>Link copiado!</h4> : null }
          <FavoriteDrink />
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
          <h4 data-testid="recipe-category">{ details.strAlcoholic }</h4>
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

DrinksProcess.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinksProcess;
