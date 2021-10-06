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
    <div>
      <select onChange={ handleChange } data-testid="explore-by-area-dropdown">
        {local.map((area, index) => (
          <option data-testid={ `${area}-option` } key={ index }>{area}</option>
        ))}
      </select>
      {card.map((item, index) => (
        <div
          role="button"
          tabIndex={ index }
          onKeyDown={ () => click(index) }
          onClick={ () => click(index) }
          data-testid={ `${index}-recipe-card` }
          key={ index }
        >
          <h3 data-testid={ `${index}-card-name` }>{item.strMeal}</h3>
          <img
            data-testid={ `${index}-card-img` }
            alt="meals"
            src={ item.strMealThumb }
            width="100px"
          />
        </div>
      ))}
    </div>
  );
}

export default Dropdown;
