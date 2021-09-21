import React from 'react';

const Login = () => (
  <div>
    <input type="email" data-testid="email-input" />
    <input type="password" data-testid="password-input" />
    <button data-testid="login-submit-btn" type="button">Entrar</button>
  </div>
);

export default Login;
