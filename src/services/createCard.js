import React from 'react';
import Card from '../components/Card';

export default function createCard(array, tipo) {
  const twelve = 12;
  const twelveFirst = array.slice(0, twelve);
  return (
    <div>
      {twelveFirst.map((alimento, i) => (
        <Card tipo={ tipo } key={ i } alimento={ alimento } />
      ))}
    </div>
  );
}
