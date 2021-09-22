import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);

  const validateLogin = () => {
    const validPassword = 5;
    const validEmail = /^([\w\d._\-#])+@([\w\d._\-#]+[.][\w\d._\-#]+)+$/;
    if (password.length > validPassword && validEmail.test(email)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
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
          validateLogin();
        } }
      />
      <input
        data-testid="password-input"
        name="password"
        placeholder="Senha"
        type="password"
        onChange={ ({ target }) => {
          setPassword(target.value);
          validateLogin();
        } }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disable }
        // onClick={ }
      >
        Entrar
      </button>
    </section>

  );
}

export default Login;
