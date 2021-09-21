import React, { useState } from 'react';

export default function Login() {
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

  return (
    <>
      <h1> Login </h1>
      <form>

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
