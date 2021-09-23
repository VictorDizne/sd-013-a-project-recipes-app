import React, { useContext } from 'react';
import Context from '../Context/Context';
import Header from '../components/Header';
import useFetchApi from '../Hooks/useFetchAPI';
import Footer from '../components/Footer';
/* import PropTypes from 'prop-types'; */

function Foods() {
  const food = 'themeal';
  const { data, recipes } = useContext(Context);
  const secondButton = true;
  useFetchApi(data.search, data.text, food);
  console.log(recipes);
  return (
    <div>
      <Header text="Comidas" secondButton={ secondButton } />
      <Footer />
    </div>
  );
}

export default Foods;
