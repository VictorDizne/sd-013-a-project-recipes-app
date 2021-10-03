import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    const saveEmail = JSON.stringify({
      email,
    });
    localStorage.setItem('user', saveEmail);
    if (localStorage.getItem('user')) {
      history.push('/comidas');
    }
  };

  const VALIDATIONEMAIL = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
  const NUMBER_SIX = 6;

  return (
    <div className="container_login">
      <h1>Login</h1>
      <form>
        <div className="text_field">
          <label htmlFor="email-id">
            Email
            <input
              id="email-id"
              className="email_class_1"
              type="email"
              data-testid="email-input"
              placeholder="trybe@gmail.com"
              value={ email }
              onChange={ handleEmail }
            />
          </label>
        </div>
        <div className="text_field">
          <label htmlFor="senha-id">
            Senha
            <input
              id="senha-id"
              className="email_class_2"
              type="password"
              data-testid="password-input"
              placeholder="*******"
              value={ password }
              onChange={ handlePassword }
            />
          </label>
        </div>
        <div className="button-container">
          <button
            type="submit"
            className="style_button"
            data-testid="login-submit-btn"
            disabled={ !(VALIDATIONEMAIL.test(email) && password.length > NUMBER_SIX) }
            onClick={ handleSubmit }
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
