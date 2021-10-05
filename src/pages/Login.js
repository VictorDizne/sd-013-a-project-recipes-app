import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
    <Container>
      <Form data-testid="login-test">
        <FormGroup>
          <Label htmlFor="email">
            Email:
            <Input
              id="email"
              type="email"
              data-testid="email-input"
              placeholder="email@gmail.com"
              onChange={ (e) => setEmail(e.target.value) }
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">
            Senha:
            <Input
              id="password"
              type="text"
              data-testid="password-input"
              placeholder="Sua senha"
              onChange={ (e) => setPassword(e.target.value) }
            />
          </Label>
        </FormGroup>
        <Button
          id="button-login"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !validation() }
          onClick={ onSubmit }
        >
          Login
        </Button>
      </Form>
    </Container>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
