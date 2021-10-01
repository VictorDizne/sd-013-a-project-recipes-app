import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import LikeButton from '../components/LikeButton';
import ShareButton from '../components/ShareButton';
import MasterCard from '../components/MasterCard';
import RecipeDetails from '../components/RecipeDetails';
import { isThisRecipeDone, isThisRecipeInProgress } from '../services/localStorageFunctions'
import { fetchFoodDetails, fetchFoodRecomendations} from '../services/fetchRecipes';

const FoodRecipeDetails = () => {

  const [foodRecipeDetails, setFoodRecipeDetails] = useState([]);
  const [recomended, setRecomended] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [visibility, setVisibility] = useState(true)
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    fetchFoodDetails(id, setFoodRecipeDetails);
    console.log(foodRecipeDetails);
    fetchFoodRecomendations(setRecomended);
    // verifica se esta receita está em processo de preapro, se está em preparo, será true
    setInProgress(isThisRecipeInProgress(id, 'comida'));
    // verifica se esta receita foi finalizada, se foi, visibility será false
    setVisibility(isThisRecipeDone(id))
  }, [id]);

  const embedVideo = () => {
    const URL = foodRecipeDetails.strYoutube;
    const embed = URL.replace('watch?v=', 'embed/');
    return (
      <iframe width="360" src={ embed } title="YouTube video player"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
       allowfullscreen>
      </iframe>
    )
  }

  const ingredients = () => {
    const keys = Object.keys(foodRecipeDetails).filter((key) => key.includes('strIngredient'));
    const ingredients = keys.map((key) => foodRecipeDetails[key]);
    return ingredients.filter((ingredient) => ingredient !== null);
  }

  const measures = () => {
	  const measuresKeys = Object.keys(foodRecipeDetails).filter((key) => key.includes('strMeasure'));
    const measuresList = measuresKeys.map((measure) => foodRecipeDetails[measure]);
    return measuresList.filter((measure) => measure !== null);
  }

  const mainButton = () => {
    if (visibility) {
      return (
			<button
	      className="continueBtn"
	      type="button"
	      data-testid="start-recipe-btn"
	      onClick={ handleClickToProgress }
	    >
	      { inProgress ? 'Continuar Receita' : 'Iniciar Receita' }
	    </button>
			);
    }
    return null;
  };

  const handleClickToProgress = () => {
    window.location.href = `${location.pathname}/in-progress`;
  };

  return (
    <div>
			<Header title="Detalhes da Receita" />
	    <section>
				<img 
					className="recipeImage" 
					src={ foodRecipeDetails.strMealThumb }
					alt="Imagem da comida"
					data-testid="recipe-photo"
				/>
				<div>
					<h2>{ foodRecipeDetails.strMeal }</h2>
					<h3>{ foodRecipeDetails.strCategory }</h3>
				</div>
				<div>
					<ShareButton id={ id } type='comidas' />
					<LikeButton id={ id } type={ foodRecipeDetails } />
				</div>
			</section>
			<RecipeDetails
				instructions={ foodRecipeDetails.strInstructions }
				ingredients={ ingredients() }
				ingredientMeasures={ measures() }
				video={ embedVideo }
				isFoodRecipe={ true }
			/>
      {
        recomended.map((drinkRecipe, idx) => (
          <MasterCard
					src={ drinkRecipe.strDrinkThumb }
					index={ idx }
					key={ `${drinkRecipe}-${idx}` }
					cardType='drinkRecomended'
					title={ drinkRecipe.strDrink }
					category={ drinkRecipe.strAlcoholic }
          />
        ))	
      }
			{ mainButton } 		
    </div>
  )
}


export default FoodRecipeDetails;
