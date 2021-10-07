const fetchAPI = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const { meals } = await fetch(url).then((response) => response.json());
  return meals;
};

export default fetchAPI;

/* export async function buscarComidasAleatoria() {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.meals;
} */
