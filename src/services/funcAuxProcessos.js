const changeLocalCheck = (name, checked) => {
  const localGet = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (localGet && localGet.cocktails[id]) {
    const ingredientsList = localGet.cocktails[id];
    if (checked) {
      setCheckedState([...checkedState, name]);
      localGet.cocktails[id] = [...ingredientsList, name];
    } else {
      const listFilter = ingredientsList.filter((ingredient) => ingredient !== name);
      localGet.cocktails[id] = listFilter;
      setCheckedState(listFilter);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(localGet));
  }
};
export default changeLocalCheck;
