// import { useState, useEffect } from 'react';

// // https://blog.logrocket.com/using-localstorage-react-hooks/
// // Custom Hook reference
// function getStorageValue(key, defaultState) {
//   const saved = localStorage.getItem(key);
//   const initial = JSON.parse(saved);
//   return initial || defaultState;
// }

// export const useLocalStorage = (key, defaultState) => {
//   const [state, setState] = useState(() => getStorageValue(key, defaultState));

//   useEffect(() => {
//     // update localStorage when the state changes
//     localStorage.setItem(key, JSON.stringify(state));
//   }, [state, setState]);

//   return [state, setState];
// };

// export const generic = () => null;
