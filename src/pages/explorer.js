import React from 'react';
import Header from '../components/header';
import LowerMenu from '../components/LowerMenu';

function Explorer() {
  return (
    <section>
      <Header name="Explorar" search={ false } />
      <LowerMenu />
    </section>
  );
}

export default Explorer;
