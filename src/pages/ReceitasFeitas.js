import React from 'react';
import CardReceitasFeitas from '../components/cardReceitasFeitas';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

const ReceitasFeitas = () => (
  <div>
    <HeaderWithoutSearch page="Receitas Feitas" />
    <CardReceitasFeitas />
  </div>
);

export default ReceitasFeitas;
