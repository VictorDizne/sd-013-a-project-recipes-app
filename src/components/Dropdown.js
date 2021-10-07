import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDebugState } from 'use-named-state';

function Dropdown() {
  const [local, setLocal] = useDebugState('local', []);
  const [option, setOption] = useDebugState('option', 'American');
  const [card, setCard] = useDebugState('card', []);
  const history = useHistory();

  useEffect(() => {
    async function fetchLocal() {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const fetchApiLocal = await fetch(URL);
      const dataLocal = await fetchApiLocal.json();
      const localList = dataLocal.meals;
      const localName = localList.map((item) => (item.strArea));
      setLocal(localName);
    }
    fetchLocal();
  }, []);

  function handleChange(e) {
    setOption(e.target.value);
  }

  useEffect(() => {
    async function cards() {
      const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${option}`;
      const fetchApiOrigem = await fetch(URL);
      const dataOrigem = await fetchApiOrigem.json();
      const NUM = 12;
      const list = dataOrigem.meals.slice(0, NUM);
      setCard(list);
    }
    cards();
  }, [option]);

  function click(index) {
    const foodID = card[index].idMeal;
    history.push(`/comidas/${foodID}`);
  }

  return (
    <div className="list-container">
      <div className="dropdown-select-contain">
        <select
          onChange={ handleChange }
          data-testid="explore-by-area-dropdown"
          className="dropdown-select"
        >
          {local.map((area, index) => (
            <option data-testid={ `${area}-option` } key={ index }>{area}</option>
          ))}
        </select>
      </div>
      {card.map((item, index) => (
        <div
          className="button-card"
          role="button"
          tabIndex={ index }
          onKeyDown={ () => click(index) }
          onClick={ () => click(index) }
          data-testid={ `${index}-recipe-card` }
          key={ index }
        >
          <div className="card-img-contain">
            <img
              data-testid={ `${index}-card-img` }
              alt="meals"
              src={ item.strMealThumb }
              width="130px"
            />
            <div className="recipe-title">
              <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dropdown;
