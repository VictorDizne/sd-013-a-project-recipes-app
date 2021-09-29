import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider(props) {
  const [data, setData] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState();
  const [filter, setFilter] = useState('All');
  const [id, setId] = useState('');
  const { children } = props;
  const contextValue = {
    data,
    setData,
    recipes,
    setRecipes,
    category,
    setCategory,
    id,
    setId,
    filter,
    setFilter };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
