import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDebugState } from 'use-named-state';
import view from '../images/view.png';

function ComponentLogin() {
  const history = useHistory();
  const [emailComp, setEmailComp] = useDebugState('email', '');
  const [passwordComp, setPasswordComp] = useDebugState('password', '');

  const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
  const six = 6;

  const handleStorage = () => {
    const setEmailLocal = JSON.stringify({ email: emailComp });
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', setEmailLocal);
  };

  const handleClick = () => {
    handleStorage();
    history.push('/comidas');
  };

  const handleChange = ({ target: { value, id } }) => {
    if (id === 'email') setEmailComp(value);
    if (id === 'password') setPasswordComp(value);
  };

  const showPassword = () => {
    const input = document.querySelector('#password');
    if (input.getAttribute('type') === 'password') {
      input.setAttribute('type', 'text');
    } else {
      input.setAttribute('type', 'password');
    }
  };

  return (
    <div className="Login-container">
      <div className="Login-title">
        <h1>Foodeez</h1>
      </div>
      <div className="Login-form">
        <div className="Login-div">
          <input
            className="Login-input"
            value={ emailComp }
            id="email"
            type="email"
            onChange={ handleChange }
            data-testid="email-input"
            required
          />
          <span>Email</span>
        </div>
        <div className="Login-div ">
          <input
            className="Login-input"
            value={ passwordComp }
            id="password"
            type="password"
            onChange={ handleChange }
            data-testid="password-input"
            required
          />
          <span>Password</span>
          <button type="button" onClick={ showPassword } className="Login-eye">
            <img src={ view } alt="" width="15px" />
          </button>
        </div>
        <button
          className="Login-input-button"
          type="button"
          disabled={ !(validEmail.test(emailComp) && passwordComp.length > six) }
          onClick={ handleClick }
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default ComponentLogin;
