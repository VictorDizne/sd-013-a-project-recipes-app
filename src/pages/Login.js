import React from 'react';

function Login() {
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
          />
        </label>
        <label htmlFor="senha-id">
          Senha
          <input
            id="senha-id"
            type="password"
            data-testid="password-input"
            placeholder="*******"
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
