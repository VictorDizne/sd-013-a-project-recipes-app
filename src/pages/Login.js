import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (event) => {
    setEmail(
      event.target.value,
    );
  };

  const handlePassword = (event) => {
    setPassword(
      event.target.value,
    );
  };

  const VALIDATIONEMAIL = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
  const NUMBER_SIX = 6;

  return (
    <div>
      <form>
        <label htmlFor="email-id">
          Email
          <input
            id="email-id"
            type="email"
            data-testid="email-input"
            placeholder="email@email.com"
            value={ email }
            onChange={ handleEmail }
          />
        </label>
        <label htmlFor="senha-id">
          Senha
          <input
            id="senha-id"
            type="password"
            data-testid="password-input"
            placeholder="*******"
            value={ password }
            onChange={ handlePassword }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !(VALIDATIONEMAIL.test(email) && password.length > NUMBER_SIX) }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
