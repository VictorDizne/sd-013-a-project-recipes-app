import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './css/login.css';
import { Input } from '@mui/material';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validation = () => {
    const validEmail = /\S+@\S+\.\S+/;
    const validPassword = 6;
    return (password.length > validPassword && validEmail.test(email));
  };

  const onSubmit = () => {
    localStorage.mealsToken = 1;
    localStorage.cocktailsToken = 1;
    localStorage.user = JSON.stringify({ email });
    props.history.push('/comidas');
  };

  return (
    <div>
      <form
        data-testid="login-test"
      >
        <h1 className="mb-5 text-white fw-bold">Login</h1>
        <label htmlFor="email">
          Email:
          <Input
            id="email"
            type="text"
            data-testid="email-input"
            placeholder="email@gmail.com"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label
          htmlFor="password"
        >
          Senha:
          <input
            id="password"
            type="text"
            data-testid="password-input"
            placeholder="Sua senha"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          id="button-login"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !validation() }
          onClick={ onSubmit }
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
