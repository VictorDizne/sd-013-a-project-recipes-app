import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Context';

const Provider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [radioInput, setRadioInput] = useState('');
  const [myPage, setMyPage] = useState('');
  const [recipe, setRecipe] = useState([]);

  const contextValue = {
    email,
    setEmail,
    searchInput,
    password,
    setPassword,
    setSearchInput,
    radioInput,
    recipe,
    setRadioInput,
    setRecipe,
    setMyPage,
    myPage,
  };
  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
};

export default Provider;

Provider.propTypes = { children: PropTypes.node.isRequired };
