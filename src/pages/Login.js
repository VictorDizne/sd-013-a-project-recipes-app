import PropTypes from 'prop-types';
import React, { useState } from 'react';

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
      <form>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="text"
            data-testid="email-input"
            placeholder="email@gmail.com"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password">
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
          Login
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
