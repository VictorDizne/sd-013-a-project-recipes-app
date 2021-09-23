import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

function Login() {
  const [email, setEmail] = useState('user', '');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);
  const history = useHistory();

  const validateLogin = () => {
    const validPassword = 6;
    const validEmail = /^([\w\d._\-#])+@([\w\d._\-#]+[.][\w\d._\-#]+)+$/;
    if (password.length > validPassword && validEmail.test(email)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  useEffect(validateLogin, [email, password]);

  const handleSubmit = () => {
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  };

  return (
    <section>
      <input
        data-testid="email-input"
        name="email"
        placeholder="Email"
        type="email"
        onChange={ ({ target }) => {
          setEmail(target.value);
        } }
      />
      <input
        data-testid="password-input"
        name="password"
        placeholder="Senha"
        type="password"
        onChange={ ({ target }) => {
          setPassword(target.value);
        } }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disable }
        onClick={ handleSubmit }
      >
        Entrar
      </button>
    </section>
  );
}

export default Login;
