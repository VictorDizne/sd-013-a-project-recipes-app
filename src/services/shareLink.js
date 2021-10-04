const copy = require('clipboard-copy');

function shareLink(mealOrDrink, id) {
  if (mealOrDrink === 'Meal') {
    copy(`/comidas/${id}`);
  } else {
    copy(`/bebidas/${id}`);
  }
  global.alert('Link copiado!');
}

export default shareLink;
