import React, { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Input, Button } from '../components';

const Login = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const passwordCorrect = () => {
    const passwordLength = 6;
    if (user.password !== undefined && user.password.length > passwordLength) {
      return true;
    }
    return false;
  };

  const validateEmail = () => {
    const emailCorrect = /\S+@\S+\.\S+/;
    return emailCorrect.test(user.email);
  };

  const handleClick = () => {
    const emailUser = { email: user.email };
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(emailUser));
    history.push('/comidas');
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser({
      ...user,
      [name]: value });
  };

  return (
    <section>
      <Input
        name="email"
        labelText="Email"
        inputType="text"
        testID="email-input"
        handleChange={ handleChange }
      />
      <Input
        name="password"
        labelText="Senha"
        inputType="password"
        testID="password-input"
        handleChange={ handleChange }
      />
      <Button
        disabled={ !(validateEmail() && passwordCorrect()) }
        handleClick={ handleClick }
        testID="login-submit-btn"
      >
        Entrar
      </Button>
    </section>
  );
};

const { func, string, bool } = PropTypes;

Button.propTypes = ({
  handleClick: func,
  handleChange: func,
  validateEmail: func,
  passwordCorrect: func,
  testID: string,
  disabled: bool,
}).isRequired;

export default Login;
