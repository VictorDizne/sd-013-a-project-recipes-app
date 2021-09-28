import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import useApiId from '../hooks/useApiId';

function RecipeDetails(props) {
  const { match: { params: { id } } } = props;
  console.log(useLocation());
  const { pathname } = useLocation();
  console.log(pathname);
  const pathnameCheck = () => {
    switch (pathname) {
    case `/comidas/${id}`:
      return 'themealdb';
    case `/bebidas/${id}`:
      return 'thecocktaildb';
    default:
      return null;
    }
  };

  const [data, isMeal] = useApiId(pathnameCheck(), id);
  // console.log(Object.values(data));
  console.log(data);

  // const [recipe, setRecipe] = useState([]);

  // useEffect(() => {
  //   const fetchId = async (type, i) => {
  //     const result = await fetch(`https://www.${type}.com/api/json/v1/1/lookup.php?i=${i}`);
  //     const json = await result.json();
  //     setRecipe(json);
  //     console.log(json);
  //   };
  //   fetchId(pathnameCheck(), id);
  // });

  // const  = ({ recipe, isMeal }) => {
  //   const foods = [];
  // };

  const arrayIngredient = Object.entries(data);
  const arrayIngredientItem = [];
  console.log(arrayIngredient);

  return (
    <div>
      <h1>RecipeDetails</h1>

      <div>
        <img
          data-testid="recipe-photo"
          src={ isMeal ? data.strMealThumb : data.strDrinkThumb }
          alt={ isMeal ? 'foto da comida' : 'foto da bebida' }
        />

        <h2 data-testid="recipe-title">{isMeal ? data.strMeal : data.strDrink}</h2>

        <button
          type="button"
          src={ shareIcon }
          alt="compartilhar"
          data-testid="share-btn"
        />

        <button
          type="button"
          src={ blackHeartIcon }
          alt="favorita receita"
          data-testid="favorite-btn"
        />

        <h2
          data-testid="recipe-category"
        >
          { data.strCategory || data.strAlcoholic }
        </h2>

        <ul>
          {arrayIngredient.forEach((item) => {
            if (item[0] === 'strIngredient') {
              arrayIngredientItem.push(item[1]);
            }
          }).map((item, index) => <li key={ index }>{ item }</li>)}

          {/* .filter((a) => (
      a[0] === 'strIngredient'
                      )).map((a, index) => (
                      <li key={ index }>
                 { a }
         </li>
     ))} */}
          {/* {data.map((item, i) => (
            <li
              key={ `${item.name} ${i}` }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {`${item.name} ${item.measure}` }
            </li>
          ))} */}
        </ul>
{/* 
        <p data-testid="instructions">{data.strInstructions}</p>
        {isMeal && <iframe data-testid="video" title="video" src={ data.strYoutube } />}
        <p data-testid={ `${index}-recomendation-card` }>Recomendation</p>
        <button type="button" data-testid="start-recipe-btn">Start Recipe</button> */}
      </div>

    </div>
  );
}

RecipeDetails.propTypes = {
  data: PropTypes.shape({
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strInstructions: PropTypes.string,
    strCategory: PropTypes.string,
    strMeal: PropTypes.string,
    strVideo: PropTypes.string,
    strIngredient: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
};

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default RecipeDetails;
