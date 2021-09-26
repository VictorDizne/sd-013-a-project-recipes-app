import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDebugState } from 'use-named-state';

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
    <div className="Login-container">
      <div className="Login-title">
        <h1>Foodeez</h1>
      </div>
      <div className="Login-form">
        <input
          className="Login-input"
          value={ emailComp }
          id="email"
          type="email"
          placeholder="Digite seu email"
          onChange={ handleChange }
          data-testid="email-input"
        />
        <input
          className="Login-input"
          value={ passwordComp }
          id="password"
          type="password"
          placeholder="Digite sua senha"
          onChange={ handleChange }
          data-testid="password-input"
        />
        <button
          className="Login-input"
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
