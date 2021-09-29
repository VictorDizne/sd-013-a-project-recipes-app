import React from 'react';
import RecomendationCard from './RecomendationCard';

const SEIS = 6;

const RecomendationMap = ({ itens, pathname, isMeal }) => {
  console.log('MAP', itens, pathname);
  return (
    itens.map((item, index) => (
      index < SEIS && <RecomendationCard
        item={ item }
        index={ index }
        pathname={ pathname }
        isMeal={ isMeal }
      />
    ))
  );
};

export default RecomendationMap;
