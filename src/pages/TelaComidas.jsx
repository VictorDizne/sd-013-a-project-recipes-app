import { useContext } from 'react';
import MyContext from '../context/myContext';
import createCard from '../services/createCard';

const TelaComidas = () => {
  const { dataFood } = useContext(MyContext);
  return createCard(dataFood, 'Meal');
};
export default TelaComidas;
