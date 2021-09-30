export default function getMealById(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((result) => result.json())
    .then((resolve) => resolve.meals[0]);
}