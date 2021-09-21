import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');

  return (
    <div>
      <form>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="text"
            data-testid="email-input"
            placeholder="Exemplo de email: abc@gmail.com"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            id="password"
            type="text"
            data-testid="password-input"
            placeholder="Sua senha"
          />
        </label>
        <label htmlFor="button-login">
          Login:
          <input
            id="button-login"
            type="submit"
            data-testid="login-submit-btn"
          />
        </label>
      </form>
    </div>
  );
};

export default Login;
