import React, { useEffect, useState } from 'react';

function Login() {
  const [button, setButton] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Funcao que faz a verificacao do email: requisito 5
  const verifyEmailAndPassword = () => {
    const checkEmail = /.+@.+\.[A-Za-z]+$/;
    const minimumCarac = 5;
    if (password.length > minimumCarac && checkEmail.test(email)) {
      setButton(false);
    } else { setButton(true); }
  };

  // A funcao que verifica é utilizada toda vez que email ou  password sao alterados
  useEffect(() => {
    verifyEmailAndPassword();
  }, [email, password]);

  // setam o email e a password
  const handleChange = ({ target: { value, name } }) => {
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  // const handleClick = () => {
  // };

  return (
    <div>
      <form>
        <input
          data-testid="email-input"
          type="email"
          placeholder="Email"
          name="email"
          onChange={ handleChange }
        />
        <input
          minLength="6"
          data-testid="password-input"
          type="password"
          placeholder="Senha"
          name="password"
          onChange={ handleChange }
        />
        <button
          disabled={ button }
          data-testid="login-submit-btn"
          type="submit"
          id="button"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
