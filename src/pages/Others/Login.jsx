import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../../CSS/Login.css';

const emailRegex = /\S+@\S+\.\S+/;
const passwordMinLength = 7;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const btnStatus = !(emailRegex.test(email) && password.length >= passwordMinLength);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const payload = { email, mealsToken: 1, cocktailsToken: 1 };
    dispatch({ type: 'REGISTER_USER', payload });
    history.push('/comidas');
  };

  return (
    <div className="login-container">
      <form onSubmit={ handleSubmit } className="login-form">
        <h3 className="login-heading">Login</h3>
        <input
          type="email"
          data-testid="email-input"
          className="login-email"
          placeholder="Email"
          value={ email }
          onChange={ (evt) => setEmail(evt.target.value) }
        />
        <input
          type="password"
          data-testid="password-input"
          className="login-password"
          placeholder="Senha"
          value={ password }
          onChange={ (evt) => setPassword(evt.target.value) }
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          className="login-btn"
          disabled={ btnStatus }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
