async function fetchApi(searchInput , radioInput, myPage) {
  if (radioInput === 'ingredient') {
    const returnedJson = await fetch(`https://www.${myPage}.com/api/json/v1/1/filter.php?i=${searchInput}`).then((res) => res.json());
    return returnedJson;
  } if (radioInput === 'name') {
    const returnedJson = await fetch(`https://www.${myPage}.com/api/json/v1/1/search.php?s=${searchInput}`).then((res) => res.json());
    return returnedJson;
  }
  if (radioInput === 'first-letter' && searchInput.length > 1) {
    global.alert('Sua busca deve conter somente 1 (um) caracter');
  }
  const returnedJson = await fetch(`https://www.${myPage}.com/api/json/v1/1/search.php?f=${searchInput}`).then((res) => res.json());
  return returnedJson;
}

// export async function fetchFood() {
//   const result = await fetch('www.themealdb.com/api/json/v1/1/categories.php').
//   then((resp) => resp.json)
//   return result;
// }

export default fetchApi;


