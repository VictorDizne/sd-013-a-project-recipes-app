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
    <div className="login-container">
      <input
        value={ emailComp }
        data-testid="email-input"
        id="email"
        type="email"
        placeholder="Email"
        onChange={ handleChange }
      />
      <input
        value={ passwordComp }
        id="password"
        type="password"
        placeholder="Password"
        data-testid="password-input"
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ handleClick }
        disabled={ !(validEmail.test(emailComp) && passwordComp.length > six) }
      >
        Entrar
      </button>
    </div>
  );
}

export default ComponentLogin;
