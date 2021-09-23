// import { useContext, useEffect } from 'react';
// import Context from '../Context/Context';

// const useFetchAPI = (value, input, page) => {
//   const [recipes, setRecipes] = useContext(Context);

//   useEffect(() => {
//     const arrayValues = ['ingredient', 'nameSearch', 'firstLetter'];
//     const arrayUrl = [
//       `https://www.${page}db.com/api/json/v1/1/filter.php?i=${input}`,
//       `https://www.${page}db.com/api/json/v1/1/search.php?s=${input}`,
//       `https://www.${page}db.com/api/json/v1/1/search.php?f=${input}`];
//     const index = arrayValues.indexOf(value);
//     const url = arrayUrl[index];

//     async function fetchResult() {
//       const result = await (await fetch(url)).json();
//       setRecipes(result.meals);
//     }

//     fetchResult();
//   }, []);

//   return { recipes };
// };

// export default useFetchAPI;
// import { useEffect, useState } from 'react';

// export default function usePlanets() {
//   const [planets, setPlanets] = useState([]);

//   useEffect(() => {
//     async function fetchResult() {
//       await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
//       const { results } = await fetchResult.json();
//       const filteredData = results.map((result) => {
//         const resultFilter = result;
//         delete resultFilter.residents;
//         return resultFilter;
//       });
//     }
//   }, []);
// }

// let url = '';
// switch (value) {
// case 'ingredient':
//   url = `https://www.${page}db.com/api/json/v1/1/filter.php?i=${input}`;
//   break;
// case 'nameSearch':
//   url = `https://www.${page}db.com/api/json/v1/1/search.php?s=${input}`;
//   break;
// case 'firstLetter':
//   url = `https://www.${page}db.com/api/json/v1/1/search.php?f=${input}`;
//   break;
// default:
// }

// SD
// const expr = 'Papayas';
// switch (expr) {
//   case 'Oranges':
//     console.log('Oranges are $0.59 a pound.');
//     break;
//   case 'Mangoes':
//   case 'Papayas':
//     console.log('Mangoes and papayas are $2.79 a pound.');
//     // expected output: "Mangoes and papayas are $2.79 a pound."
//     break;
//   default:
//     console.log(`Sorry, we are out of ${expr}.`);
// }
