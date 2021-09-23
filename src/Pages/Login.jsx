// baseado no meu projeto da Elaine - https://github.com/tryber/sd-013-a-project-trybewallet/commit/668b077c70f48ff72c6ce11fc20c0c9225d4b590
import React, { useEffect, useState, useContext } from 'react';
import Context from '../context/Context';

function Login() {
  // salvando no estado as constantes de email, senha e botao
  const [disabled, setDisabled] = useState(true); // botao tem que estar disativado
  const { emailInput, setEmailInput } = useContext(Context);
  const [password, setPassword] = useState('');

  // usar hook-useEffect para validaçao da senha e email
  useEffect(() => {
    // funçao para guardar constantes para o regex email e tamanho da senha
    const buttonDesabled = () => {
      const emailRegex = /\S+@\S+\.\S+/; // REGEX retirado do post: https://stackoverflow.com/questions/35788383/regex-validation-in-javascript-email
      const passwordLenght = 6;
      const isValid = emailRegex.test(emailInput);
      const validation = password.length > passwordLenght && isValid;
      // criar uma condicional para validaçao de email e senha
      if (validation) {
        setDisabled(false);
      } else { setDisabled(true); }
    };
    buttonDesabled();
  }, [emailInput, password]);

  // criar uma funçao para submeter os token no local storage,
  const handleSubmit = () => {
    // criando uma constante para salvar o formato que ficara no local storage usando user como foi pedido
    const user = { email: emailInput };
    // salvando no local storage
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    // usei "JSON.stringify" para converter valores de javascript em uma string.
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <div>
      {/* colocando value nos inputs, para ficarem no estado e serem alterados */}
      {/* criar um onchange chamando uma arrow Function com uma target
      para atualizaçao do estado do email e da senha */}
      <input
        type="email"
        data-testid="email-input"
        value={ emailInput }
        onChange={ ({ target }) => setEmailInput(target.value) }
      />
      <input
        type="password"
        data-testid="password-input"
        value={ password }
        onChange={ ({ target }) => setPassword(target.value) }
      />
      {/* criando onclick e chamando a funçao handleSubmit criado acima */}
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disabled }
        onClick={ handleSubmit }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
