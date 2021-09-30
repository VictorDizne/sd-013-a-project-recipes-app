import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Logo from '../images/logo.svg';
import './css/Login.css';

export default function Login({ history }) {
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

  const handleSubmit = (event) => {
    event.preventDefault(); // O preventDefault() não deixa a página atualizar (renderizar de novo)
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  };

  return (
    <>
      <div className="logo">
        <img className="logo-image" src={ Logo } alt="logo" />
      </div>
      <form onSubmit={ handleSubmit }>
        <TextField
          id="name-text-input"
          label="Email"
          variant="outlined"
          name="email"
          onChange={ handleChange }
          value={ email }
          type="email"
          margin="dense"
          size="small"
          inputProps={ {
            'data-testid': 'email-input',
          } }
          fullWidth
        />
        <TextField
          id="password-text-field"
          label="Password"
          variant="outlined"
          name="password"
          onChange={ handleChange }
          value={ password }
          size="small"
          type="password"
          margin="dense"
          inputProps={ {
            'data-testid': 'password-input',
          } }
          fullWidth
        />
        <Button
          variant="contained"
          data-testid="login-submit-btn"
          disabled={ !validEmail || !validPassword }
          startIcon={ <LoginIcon /> }
          type="submit"
          fullWidth
        >
          Login
        </Button>
      </form>
    </>
  );
}

Login.propTypes = {
  history: PropTypes.shape(),
}.isRequired;
