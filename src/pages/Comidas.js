import React, { useContext } from 'react';
import Header from '../components/Header';
import recipeContext from '../context';
import SearchInput from '../components/SearchInput';
import ComponentFooter from '../components/ComponentFooter';

function Comidas() {
  const currentContext = useContext(recipeContext).ContextComidas;
  const { showInput } = currentContext;
  return (
    <div>
      <Header title="Comidas" hideSearch={ false } hideProfile={ false } />
      {showInput && <SearchInput />}
      <ComponentFooter />
    </div>
  );
}

export default Comidas;
