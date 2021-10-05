import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
// consulta ao site - https://pt-br.reactjs.org/docs/render-props.html

function Provider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [heartState, setHeartState] = useState(false);
  const [filterIngredients, setFilterIngredients] = useState('');

  const setMealsValue = (newMeals) => setMeals(newMeals);
  const setDrinksValue = (newDrinks) => setDrinks(newDrinks);

  return (
    // permite componentes consumidores a assinarem mudanças no contexto, no caso email e set email que serao salvos no estado
    <Context.Provider
      value={ {
        emailInput,
        setEmailInput,
        meals,
        setMealsValue,
        drinks,
        setDrinksValue,
        heartState,
        setHeartState,
        filterIngredients,
        setFilterIngredients,
      } }
    >
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
