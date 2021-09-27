import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import TextInput from '../components/textInputs';
import Input from '../components/buttons';
import { saveToken, saveEmail, initialRecipesFavorites,
} from '../localStorage/localStorageSaves';

function Login(props) {
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lockInput, setLockInput] = useState('disabled');

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'email') return setEmail(value);
    if (name === 'password') return setPassword(value);
  };

  const validateLogin = (email, pass) => {
    const MaxPassLength = 6;

    const validadeEmail = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const validatePass = pass.length > MaxPassLength;
    return (validadeEmail && validatePass);
  };

  useEffect(() => {
    if (validateLogin(Email, password)) {
      setLockInput('');
    } else { setLockInput('disabled'); }
  }, [Email, password]);

  const onClick = () => {
    const { history } = props;

    saveToken('mealsToken');
    saveToken('cocktailsToken');
    initialRecipesFavorites();
    saveEmail(Email);

    history.push('/comidas');
  };

  return (
    <div>
      <TextInput
        name="email"
        value={ Email }
        onChange={ handleChange }
      />
      <TextInput
        name="password"
        value={ password }
        onChange={ handleChange }
      />
      <Input
        name="Entrar"
        value={ lockInput }
        type="password"
        onClick={ onClick }
      />
    </div>);
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
