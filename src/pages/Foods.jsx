import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import * as APIendpoints from '../services/APIendpoints';

function Foods() {
  const obj = [];
  const [foods, setFoods] = useState(obj);

  useEffect(() => {
    const fetchFoods = async () => {
      const sizeFoods = 12;
      const results = await APIendpoints.searchFood('');
      setFoods(results.filter((result, index) => index < sizeFoods));
    };
    fetchFoods();
    if (foods === obj) return;
    setFoods(obj);
  }, [obj]);
  return (
    <div>
      <Header />
      Foods
      <Footer />
    </div>

  );
}

export default Foods;
