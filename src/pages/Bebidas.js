import React, { useContext } from 'react';
import Header from '../components/Header';
import recipeContext from '../context';
import SearchInput from '../components/SearchInput';
import ComponentFooter from '../components/ComponentFooter';

function Bebidas() {
  const currentContext = useContext(recipeContext).ContextComidas;
  const { showInput } = currentContext;
  return (
    <div>
      <Header title="Bebidas" hideSearch={ false } hideProfile={ false } />
      {showInput && <SearchInput />}
      <ComponentFooter />
    </div>
  );
}

export default Bebidas;
