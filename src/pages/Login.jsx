import React, { useState } from 'react';
import { useHistory as UseHistory } from 'react-router-dom';

export default function Login() {
  const history = UseHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);

  function handleClick() {
    const user = { email };
    const inProgressRecipe = {
      cocktails: {},
      meals: {},
    };
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipe));
    history.push('/comidas');
  }

  function isValid() {
    const regex = /(.)(.*)@(.)(.*)\.(...)(.*)/;
    const passNum = 6;
    if (email.match(regex) && password.length >= passNum && valid === false) {
      setValid(true);
    }
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
    isValid();
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
    isValid();
  }
  return (
    <div className="login-panel">
      <form>
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            type="email"
            name="email"
            onChange={ (e) => handleChangeEmail(e) }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            data-testid="password-input"
            type="password"
            name="password"
            onChange={ (e) => handleChangePassword(e) }
          />
        </label>
        {valid
          ? (
            <button
              data-testid="login-submit-btn"
              type="button"
              onClick={ () => handleClick() }
            >
              Entrar

            </button>)
          : <button disabled data-testid="login-submit-btn" type="button">Entrar</button>}
      </form>
    </div>
  );
}
