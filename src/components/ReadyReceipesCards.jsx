// import React, { useEffect, useContext } from 'react';
// import appContext from '../contexts/appContext';

// function ReadyReceipesCards() {
//   const { filterDoneFood } = useContext(appContext);
//   let doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

//   useEffect(() => {
//     if (filterDoneFood !== 'all') {
//       doneRecipes = doneRecipes.filter((recipe) => recipe[filterDoneFood] !== undefined);
//     }
//   }, [filterDoneFood]);

//   return (
//     <section>
//       {doneRecipes.map((doneRecipe, index) => (
//         <div id="ready-card" key={ index }>
//           <img data-testid={ `${index}-horizontal-image` } src={ doneRecipe.strMealThumb } alt="" />
//           <p data-testid={ `${index}-horizontal-top-text` }>
//             texto da categoria da receita
//           </p>
//           <p data-testid={ `${index}-horizontal-name` }>
//             texto do nome da receita
//           </p>
//           <p data-testid={ `${index}-horizontal-done-date` }>
//             texto da data que a receita foi feita
//           </p>
//           <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
//             botão de compartilhar
//           </button>
//           <span data-testid={ `${index}-${doneRecipe.strTags}-horizontal-tag` }>
//             TAGS
//           </span>
//         </div>
//       ))}
//     </section>
//   );
// }

// export default ReadyReceipesCards;
