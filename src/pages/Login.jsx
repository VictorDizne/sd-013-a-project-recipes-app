import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../PaginasCss/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  function userValid() {
    const passLength = 7;
    const validPassword = password.length >= passLength;
    const validEmail = /^[a-z0-9_]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/i.test(
      email,
    );
    return validEmail && validPassword;
  }
  return (
    <section>
      <h2 className="login-title">Login</h2>
      <form>
        <input
          className="input"
          type="email"
          value={ email }
          placeholder="Email"
          onChange={ (event) => setEmail(event.target.value) }
          data-testid="email-input"
        />
        <input
          className="input"
          type="password"
          placeholder="Senha"
          data-testid="password-input"
          value={ password }
          onChange={ (event) => setPassword(event.target.value) }
        />
        <Link to="/comidas">
          <div>
            <button
              className="login-submit-btn"
              type="button"
              onClick={ userLogin }
              disabled={ !userValid() }
              data-testid="login-submit-btn"
            >
              Entrar
            </button>
          </div>
        </Link>
      </form>
    </section>
  );
}

export default Login;
