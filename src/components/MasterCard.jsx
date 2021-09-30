// import React from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// const Img = styled.img`
//   max-width: 45vw;
// `;

// function MasterCard(props) {
//   const {
//     // props usadas em todos os tipos de card
//     cardType,
//     title,
//     src,
//     index,
//     category,
//     // props usadas nos favoritos
//     id,
//     area,
//     type,
//     recipe,
//     // props usadas nas receitas feitas
//     tags,
//     doneDate,
//     // prop usada nas receitas feitas e favoritas
//     shareBtn,
//     favOrDone = false,
//   } = props;

//   const favBtn = () => (
//     <LikeButton
//       id={ id }
//       favOrDone={ favOrDone }
//       idx={ index }
//       recipe={ recipe }
//     />
//   );

//   const shareBtn = () => (
//     <ShareButton
//       id={ id }
//       type={ type }
//     />
//   );

//   const recipeCard = () => (
//     <div data-testid={ `${index}-recipe-card` }>
//       <Img src={ src } alt={ title } data-testid={ `${index}-card-img` } />
//       <h3 data-testid={ `${index}-card-name` }>{ title }</h3>
//     </div>
//   );

//   // const ingredientCard = () => (
//   //   <div
//   //     className="ingredientCard"
//   //     data-testid={ `${index}-ingredient-card` }
//   //   >
//   //     <img
//   //       className="ingredientImg"
//   //       data-testid={ `${index}-card-img` }
//   //       src={ src }
//   //       alt={ title }
//   //     />
//   //     <span
//   //       className="ingredientName"
//   //       data-testid={ `${index}-card-name` }
//   //     >
//   //       { name }
//   //     </span>
//   //   </div>
//   // );

//   const recomendedCard = () => (
//     <div data-testid={ `${index}-recomendation-card` }>
//       <Img src={ src } alt={ title } data-testid={ `${index}-card-img` } />
//       <p>{ category }</p>
//       <h3 data-testid={ `${index}-recomendation-title` }>{ title }</h3>
//     </div>
//   );

//   const favoritedCard = () => (
//     <div className="favoritedCard">
//       <Link to={ `${type}s/${id}` }>
//         <img
//           src={ src }
//           alt={ title }
//           data-testid={ `${index}-horizontal-image` }
//           className="favCardImg"
//         />
//       </Link>
//       <div className="favCardDetails">
//         <div className="category-share-container">
//           <span
//             className="category"
//             data-testid={ `${index}-horizontal-top-text` }
//           >
//             { type === 'comida'
//               ? `${area} - ${category}`
//               : `${category}` }
//           </span>
//           { shareBtn }
//           { favBtn }
//         </div>
//         <Link
//           to={ `${type}s/${id}` }
//           className="favNameLink"
//         >
//           <span className="favName" data-testid={ `${index}-horizontal-name` }>
//             { title }
//           </span>
//         </Link>
//       </div>
//     </div>
//   );

//   const doneRecipe = () => (
//     <div className="doneCard">
//       <Link to={ `${type}s/${id}` }>
//         <img
//           src={ src }
//           alt={ title }
//           data-testid={ `${index}-horizontal-image` }
//           className="favCardImg"
//         />
//       </Link>
//       <div className="favCardDetails">
//         <div className="share">
//           <span
//             className="category"
//             data-testid={ `${index}-horizontal-top-text` }
//           >
//             { type === 'comida'
//               ? `${area} - ${category}`
//               : `${category}` }
//           </span>
//           { shareBtn }
//         </div>
//         <Link
//           to={ `${type}s/${id}` }
//           className="favNameLink"
//         >
//           <span className="favName" data-testid={ `${index}-horizontal-name` }>
//             { title }
//           </span>
//         </Link>
//         <span
//           className="doneDate"
//           data-testid={ `${index}-horizontal-done-date` }
//         >
//           { `Feita em: ${doneDate}` }
//         </span>
//         <div className="favTags">
//           {
//             (type === 'comida') && (tags.length > 0)
//               ? (
//                 (tags.slice(0, 2)).map((tag, tagIdx) => (
//                   <span
//                     key={ tagIdx }
//                     className="favTag"
//                     data-testid={ `${index}-${tag}-horizontal-tag` }
//                   >
//                     { tag }
//                   </span>
//                 ))
//               ) : (
//                 <> </>
//               )
//           }
//         </div>
//       </div>
//     </div>
//   );

//   const renderObject = {
//     foodRecipe: () => recipe(),
//     ingredient: () => ingredient(),
//     drinkRecipe: () => recipe(),
//     foodRecomended: () => recomended(),
//     drinkRecomended: () => recomended(),
//     favorited: () => favorited(),
//     doneRecipe: () => doneRecipe(),
//   }
//   return (
//     renderObject[cardType]
//   );
// }

// const { string } = PropTypes;

// MasterCard.propTypes = {
//   index: string,
//   title: string,
//   url: string,
// }.isRequired;

// export default MasterCard;
