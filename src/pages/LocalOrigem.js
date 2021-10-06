import React from 'react';
import Header from '../components/ComponentHeader';
import ComponentFooter from '../components/ComponentFooter';
import Dropdown from '../components/Dropdown';

function LocalOrigem() {
  return (
    <div>
      <Header title="Explorar Origem" hideSearch={ false } hideProfile={ false } />
      <ComponentFooter />
      <Dropdown />
    </div>
  );
}

export default LocalOrigem;
