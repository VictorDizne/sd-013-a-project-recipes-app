import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import Context from '../Context/Context';
import { handleAPIDrinks } from '../service/GetAPIDrinks';
import { handleAPIFoods } from '../service/GetAPIFoods';

const Provider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [inputRadio, setInputRadio] = useState('');

  const path = useLocation().pathname.replace('/', '');

  const history = useHistory();

  const pathRotesVerify = path === 'explorar'
  || path === 'explorar/comidas'
  || path === 'explorar/bebidas'
  || path === 'explorar/comidas/ingredientes'
  || path === 'explorar/bebidas/ingredientes'
  || path === 'perfil'
  || path === 'receitas-feitas'
  || path === 'receitas-favoritas';

  const pathLong = path.replace(/\//g, ' ').replace(/-/g, ' ').replace('comidas ', '')
    .replace('bebidas ', '')
    .replace('area', 'Origem')
    .toLowerCase()
    .replace(/(?:^|\s)(?!da|de|do)\S/g, (l) => l.toUpperCase());

  const shortPath = path.toLowerCase()
    .replace(/(?:^|\s)(?!da|de|do)\S/g, (l) => l.toUpperCase());

  function clickLoading() {
    setLoading(!loading);
    console.log(!loading);
  }

  const handleInputText = ({ target }) => {
    setInputText(target.value);
  };

  const handleInputRadio = ({ target }) => {
    setInputRadio(target.value);
  };

  const handleClickFetch = async () => {
    console.log(data);
    if (inputRadio === 'primeira letra' && inputText.length >= 2) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (path === 'comidas') {
      const dataComidas = await handleAPIFoods(inputRadio, inputText);
      if (dataComidas === null) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else {
        setData(dataComidas);
      }
    }
    if (path === 'bebidas') {
      const dataBebidas = await handleAPIDrinks(inputRadio, inputText);
      if (dataBebidas === null) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else {
        setData(dataBebidas);
      }
    }
  };

  const changePage = async () => {
    if (path === 'bebidas' && data.length === 1) {
      history.push(`/bebidas/${data[0].idDrink}`);
    }
    if (path === 'comidas' && data.length === 1) {
      history.push(`comidas/${data[0].idMeal}`);
    }
  };

  // Aqui no objeto context vc passsa o que quer acessar em outra pagina,
  // no meu caso eu "loading, setLoading e clickLoading" e setData como test mas podendo ser uma função ou outra coisa
  //  que julgue necessario.
  const context = {
    clickLoading,
    handleInputText,
    handleInputRadio,
    path,
    pathRotesVerify,
    pathLong,
    shortPath,
    handleClickFetch,
    data,
    changePage,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
