import React, { useState } from 'react';
import Context from '.';

const Provider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  const contextValue = { setRecipes };
  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>

  );
};

export default Provider;
