import { useContext } from 'react';
import MyContext from '../context/myContext';
import createCard from '../services/createCard';

const TelaBebidas = () => {
  const { dataDrink } = useContext(MyContext);
  return createCard(dataDrink, 'Drink');
};

export default TelaBebidas;
