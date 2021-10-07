import React, { useContext, useState } from 'react';
// const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i
// const nameRegex = /[A-Za-z-0-9]/
import { Redirect } from 'react-router';
import appContext from '../redux/appcontext';

const Form = () => {
  const {
    userEmail,
    changeUserEmail,
    userPassword,
    changeUserPassword,
  } = useContext(appContext);
  const [btnDisable, setDisable] = useState(true);
  const [redirect, enableRedirect] = useState(false);

  if (redirect) {
    return <Redirect to="/comidas" />;
  }

  function ableButton() {
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i;
    const senhaLength = 5;
    const validation = !(regexEmail.test(userEmail)
    && (userPassword.length > senhaLength));
    setDisable(validation);
  }

  function handleEmail({ target: { value } }) {
    changeUserEmail(value);
    ableButton();
  }

  function handlePassword({ target: { value } }) {
    changeUserPassword(value);
    ableButton();
  }

  function handleClick() {
    enableRedirect(true);
    const user = {
      email: userEmail,
    };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
  }

  return (
    <form>
      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          id="email"
          value={ userEmail }
          data-testid="email-input"
          placeholder="email"
          onChange={ (e) => handleEmail(e) }
        />
      </label>
      <label htmlFor="senha">
        Senha
        <input
          type="password"
          name="senha"
          id="senha"
          value={ userPassword }
          data-testid="password-input"
          placeholder="senha"
          onChange={ (e) => handlePassword(e) }
        />
      </label>

      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ btnDisable }
        onClick={ () => handleClick() }
      >
        Enviar
      </button>
    </form>
  );
};

export default Form;
