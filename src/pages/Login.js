import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import './css/login.css';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validation = () => {
    const validEmail = /\S+@\S+\.\S+/;
    const validPassword = 6;
    return (password.length > validPassword && validEmail.test(email));
  };

  const onSubmit = () => {
    localStorage.mealsToken = 1;
    localStorage.cocktailsToken = 1;
    localStorage.user = JSON.stringify({ email });
    props.history.push('/comidas');
  };

  return (
    <div
      className="background d-flex justify-content-center align-items-center"
      data-testid="login-test"
    >
      <form className="rounded form">
        <Grid
          container
          spacing={ 4 }
          columns={ 4 }
          direction="column"
          alignItems="center"
        >
          <Grid item>
            <h1>Login</h1>
          </Grid>
          <Grid item xs={ 4 }>
            <TextField
              data-testid="email-input"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              placeholder="email@gmail.com"
              onChange={ (e) => setEmail(e.target.value) }
              InputLabelProps={ {
                style: { color: '#000000' },
              } }
            />
          </Grid>
          <Grid item xs={ 4 }>
            <TextField
              data-testid="password-input"
              id="outlined-basic"
              label="Senha"
              variant="outlined"
              placeholder="Sua senha"
              onChange={ (e) => setPassword(e.target.value) }
              InputLabelProps={ {
                style: { color: '#000000' },
              } }
            />
          </Grid>
          <Grid item xs={ 4 }>
            <Button
              id="button-login"
              type="submit"
              data-testid="login-submit-btn"
              variant="contained"
              disabled={ !validation() }
              onClick={ onSubmit }
              size="large"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
