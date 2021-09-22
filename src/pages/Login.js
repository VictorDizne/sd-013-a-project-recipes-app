import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const verifyEmail = (testEmail) => {
    const emailValidation = /\S+@\S+\.\S+/;
    if (emailValidation.test(testEmail)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const verifyPassword = (testPassword) => {
    const minimumLength = 6;
    if (testPassword.length > minimumLength) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  const handleChange = ({ target }) => {
    if (target.name === 'email') {
      setEmail(target.value);
      verifyEmail(target.value);
    }

    if (target.name === 'password') {
      setPassword(target.value);
      verifyPassword(target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // O preventDefault() não deixa a página atualizar (renderizar de novo)
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  };

  return (
    <>
      <h1> Login </h1>
      <form onSubmit={ handleSubmit }>

        <input
          type="email"
          data-testid="email-input"
          name="email"
          placeholder="Email"
          value={ email }
          onChange={ handleChange }
        />

        <input
          type="password"
          data-testid="password-input"
          name="password"
          placeholder="Senha"
          value={ password }
          onChange={ handleChange }
        />

        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !validEmail || !validPassword }
        >
          Entrar
        </button>

      </form>
    </>
  );
}

Login.propTypes = {
  history: PropTypes.shape(),
}.isRequired;
