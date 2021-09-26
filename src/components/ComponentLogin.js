import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDebugState } from 'use-named-state';
import '../pages/styles/Login.css';

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

  return (
    <div className="login-container">
      <h1 className="login-title">Foodeez</h1>
      <div className="login-sub-container">
        <div className="label-float">
          <input
            value={ emailComp }
            data-testid="email-input"
            id="email"
            type="email"
            placeholder="Digite seu email"
            onChange={ handleChange }
          />
          <p>Digite seu email</p>
        </div>
        <div className="label-float">
          <input
            value={ passwordComp }
            className="login-inputs"
            id="password"
            type="password"
            placeholder="Digite sua senha"
            data-testid="password-input"
            onChange={ handleChange }
          />
          <p>Digite sua senha</p>
        </div>
        <button
          className="login-button"
          type="button"
          data-testid="login-submit-btn"
          onClick={ handleClick }
          disabled={ !(validEmail.test(emailComp) && passwordComp.length > six) }
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default ComponentLogin;
