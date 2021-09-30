// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// // import styled from 'styled-components';
// import { isThisRecipeFavorited } from '../services/localStorageFunctions';
// import { whiteHeartIcon, blackHeartIcon } from '../images';

// function LikeButton({ recipe, id, favOrDone, idx }) {
//   const [heartType, setHeartType] = useState();

//   const formatedFavoriteRecipe = (recipe) => {
//     if (recipe.strMeal) {
//       const favFoodRecipe = {
//         id: recipe.idMeal,
//         type: 'comida',
//         area: recipe.strArea,
//         category: recipe.strCategory,
//         alcoholicOrNot: '',
//         name: recipe.strMeal,
//         image: recipe.strMealThumb,
//       };
//       return favFoodRecipe;
//     }
//     if (recipe.strDrink) {
//       const favDrinkRecipe = {
//         id: recipe.idDrink,
//         type: 'bebida',
//         area: '',
//         category: recipe.strCategory,
//         alcoholicOrNot: recipe.strAlcoholic,
//         name: recipe.strDrink,
//         image: recipe.strDrinkThumb,
//       };
//       return favDrinkRecipe;
//     }
//   };

//   const addToFavorites = (thisRecipe) => {
//     if (localStorage.favoriteRecipes) {
//       const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
//       const oneMoreFav = [...favoriteRecipes, thisRecipe];
//       localStorage.setItem('favoriteRecipes', JSON.stringify(oneMoreFav));
//     }
//   };

//   const removeFromFavorites = (thisRecipe) => {
//     if (localStorage.favoriteRecipes) {
//       const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
//       const lessOneFav = favorites.filter((favorite) => favorite.id !== id);
//       localStorage.setItem('favoriteRecipes', JSON.stringify(lessOneFav));
//     }
//   };

//   const handleClick = () => {
//     // se esta receita estiver com coração branco, adiciona ela no localStorage e trnasforma o coração em preto
//     if (heartType === white) {
//       addToFavorites(formatedFavoriteRecipe);
//       setHeartType(black);
//     }
//     // se esta receita estiver com coração preto, remove ela dos favoritos e transforma o coração em branco
//     if (heartIcon === black) {
//       removeFromFavorites(formatedFavoriteRecipe);
//       setHeartType(white);
//     }
//   };

//   useEffect(() => {
//     if (isThisRecipeFavorited(id)) {
//       setHeartType(black);
//     } else {
//       setHeartType(white);
//     }
//   }, [heartType, id]);

//   return (
//     <section>
//       <button
//         className="favBtn"
//         type="button"
//         data-testid={ favOrDone ? `${index}-horizontal-favorite-btn` : 'favorite-btn' }
//         onClick={ handleClick }
//       >
//         <img src={ heartIcon } alt={ `${heartIcon}heart` } />
//       </button>
//     </section>
//   );
// }

// const { object, string, bool } = PropTypes;

// LikeButton.propTypes = {
//   recipe: object,
//   id: string,
//   favOrDone: bool,
//   idx: string,
// }.isRequired;

// export default LikeButton;
