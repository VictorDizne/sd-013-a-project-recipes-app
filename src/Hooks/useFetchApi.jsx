// import { useEffect } from 'react';

// const useFetchApi = (type) => {
//   useEffect(() => {
//     const fetchAPI = async () => {
//       const result = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?s=`);
//       const json = await result.json();
//       if (type === 'themealdb') {
//         setSearchData(json.meals);
//       } else {
//         setSearchData(json.drinks);
//       }
//     };
//     fetchAPI();
//   }, []);
// };

// export default useFetchApi;
