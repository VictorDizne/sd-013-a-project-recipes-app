import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
      <form>
        <input
          type="email"
          value={ email }
          onChange={ (event) => setEmail(event.target.value) }
          data-testid="email-input"
        />
        <input
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ (event) => setPassword(event.target.value) }
        />
        <Link to="/comidas">
          <button
            type="button"
            onClick={ userLogin }
            disabled={ !userValid() }
            data-testid="login-submit-btn"
          >
            Entrar
          </button>
        </Link>
      </form>
    </section>
  );
}

export default Login;
