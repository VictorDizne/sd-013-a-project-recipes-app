// import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
// import '../styles/RecipeCard.css';
// import { useHistory } from 'react-router-dom';
// import RecipesContext from '../context/index';

// function RecipeCard({ page, index, recipe }) {
//   const { setId } = useContext(RecipesContext);
//   const { strMeal, strMealThumb, strDrink, strDrinkThumb, idMeal } = recipe;
//   const history = useHistory();

//   const hadleChange = () => {
//     if (page === 'foods') {
//       setId(idMeal);
//       history.push(`/comidas/${idMeal}`);
//     } else {
//       setId(strDrink);
//       history.push(`/bebidas/${strDrink}`);
//     }
//   };

//   return (
//     <div data-testid={ `${index}-recipe-card` } className="content">
//       <div className="content-individual">
//         <button type="button" onClick={ hadleChange }>
//           <div
//             data-testid={ `${index}-recipe-card` }
//             className="contente"
//           >
//             <img
//               src={ (page === 'foods') ? strMealThumb : strDrinkThumb }
//               data-testid={ `${index}-card-img` }
//               alt="Imagem da receita"
//               width="50"
//             />
//             <p data-testid={ `${index}-card-name` }>
//               { (page === 'foods') ? strMeal : strDrink }
//             </p>
//           </div>
//         </button>
//       </div>
//     </div>
//   );
// }

// RecipeCard.propTypes = {
//   index: PropTypes.number,
// }.isRequired;

// export default RecipeCard;
