import React, { useEffect, useState } from 'react';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';
import { CardExploreFoodIngred } from '../components';

const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const MAX_INDEX = 12;
function ExploreFoodIngred() {
  const [listIngred, setlistIngred] = useState();

  useEffect(() => {
    const fectIngred = async () => {
      const request = await fetch(URL);
      const result = await request.json();
      setlistIngred(result.meals.slice(0, MAX_INDEX));
      console.log('request');
    };
    fectIngred();
  }, []);

  if (!listIngred) return null;
  console.log(listIngred);
  return (
    <div>
      <HeaderNoSearch word="Explorar Ingredientes" />
      {listIngred.map((item, index) => (<CardExploreFoodIngred
        key={ index }
        index={ index }
        strIngredient={ item.strIngredient }
      />))}
      <Footer />
    </div>
  );
}

export default ExploreFoodIngred;
