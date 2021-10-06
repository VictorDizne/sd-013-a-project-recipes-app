import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/ingredientsList.css';
import { useDispatch } from 'react-redux';
import { setButtonState } from '../redux/actions/index';

const IngredientsList = ({ testid, list, progress }) => {
  const dispatch = useDispatch();

  const verifyIfShouldEnableButton = () => {
    let numberOfInputsChecked = 0;
    const inputs = document.querySelectorAll('input[type=\'checkbox\']');
    inputs.forEach((input) => {
      if (input.checked) {
        numberOfInputsChecked += 1;
      }
    });
    if (numberOfInputsChecked === inputs.length) {
      dispatch(setButtonState(false));
    }
  };

  const handleClick = ({ target: { name, checked } }) => {
    const checkboxes = JSON.parse(localStorage.getItem('checkboxes'));
    if (checkboxes) {
      if (checkboxes.includes(name)) {
        // se já existe no ls, remove o item
        checkboxes.splice(checkboxes.indexOf(name), 1);
        localStorage.setItem('checkboxes', JSON.stringify([
          ...checkboxes,
        ]));
      }
      if (checked) {
        // seta o item no ls se ele estiver checkado
        localStorage.setItem('checkboxes', JSON.stringify([
          ...checkboxes,
          name,
        ]));
      }
    } else if (checked) {
      // seta o item no ls se ele estiver checkado se não existe nada no ls
      localStorage.setItem('checkboxes', JSON.stringify([
        name,
      ]));
    }
    verifyIfShouldEnableButton();
  };

  const handleCheck = () => {
    const checkboxes = JSON.parse(localStorage.getItem('checkboxes'));
    if (checkboxes) {
      checkboxes.forEach((check) => {
        const input = document.getElementById(check);
        input.setAttribute('checked', 'true');
      });
    }
  };

  useEffect(() => {
    handleCheck();
  }, []);

  return (
    <div>
      <h3>Ingredients</h3>
      {list.map((item, index) => {
        if (item) {
          if (progress) {
            const name = item.split(' -')[0];
            return (
              <label
                key={ index }
                className="ingredient-item"
                data-testid={ `${index}-${testid}` }
                htmlFor={ name }
              >
                <input
                  value={ name }
                  onClick={ handleClick }
                  type="checkbox"
                  name={ name }
                  id={ name }
                />
                {item}
              </label>
            );
          }
          return (
            <div key={ index } data-testid={ `${index}-${testid}` }>
              {item}
            </div>);
        }
        return <div key={ index } hidden />;
      })}
    </div>
  );
};

IngredientsList.propTypes = {
  testid: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  progress: PropTypes.bool.isRequired,
};

export default IngredientsList;
