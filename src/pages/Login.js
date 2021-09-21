import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleChange = () => {
    console.log('Chamei a handleChange');
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
        >
          Entrar
        </button>

      </form>
    </>
  );
}
