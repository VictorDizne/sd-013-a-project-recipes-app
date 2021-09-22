import React, { useState } from 'react';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';

function Comidas() {
  const [load, setLoad] = useState(false);

  function showHidden() {
    if (load === false) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  }

  return (
    <div>
      <Header title="Comidas" hideSearch={ false } hideProfile={ false } />
      {load && <SearchInput/>}
    </div>
  );
}

export default Comidas;
