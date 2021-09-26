import React, { useState } from 'react';
import PropTypes from 'prop-types';

const regexEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const minCaractere = 6;

const Login = ({ history }) => {
  const [stateLogin, setLogin] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setLogin({ ...stateLogin, [name]: value });
  };

  const { email, password } = stateLogin;

  const submitLogin = () => {
    const emailStorage = {
      email,
    };
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(emailStorage));
    history.push('/comidas');
  };

  const statusButton = !(regexEmail.test(email) && password.length > minCaractere);
  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        id="email-input"
        name="email"
        data-testid="email-input"
        placeholder="Email"
        onChange={ handleChange }
      />
      <input
        type="text"
        id="password-input"
        name="password"
        data-testid="password-input"
        placeholder="Password"
        onChange={ handleChange }
      />
      <button
        type="button"
        disabled={ statusButton }
        data-testid="login-submit-btn"
        onClick={ submitLogin }
      >
        Entrar
      </button>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;