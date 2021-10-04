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
    <div className="inputContainer">
      
        <form className="container">
          <br />
        <div className="loginForm">
          <label className="input-group mb-3" htmlFor="email">
            <span className="input-group-text">Email</span>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              value={ userEmail }
              data-testid="email-input"
              placeholder="Insira seu Email"
              onChange={ (e) => handleEmail(e) }
            />
          </label>
          <label className="input-group mb-3" htmlFor="senha">
            <span className="input-group-text">Senha</span>
            <input
              type="password"
              name="senha"
              id="senha"
              className="form-control"
              value={ userPassword }
              data-testid="password-input"
              placeholder="Insira sua senha, Minimo de 7 caracteres"
              onChange={ (e) => handlePassword(e) }
            />
          </label>

          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ btnDisable }
            className="btn btn-primary"
            onClick={ () => handleClick() }
          >
            Enviar
          </button>
        </div>
        </form>
      
    </div>
  );
};

export default Form;
