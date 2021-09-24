import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { foodAPIRequest } from '../services/APIrequest';
import Loading from '../components/Loading';

const DetalheComidas = ({ match: { params: { id } } }) => {
  const [APIState, setAPIState] = useState([]);

  useEffect(() => {
    const getAPIdata = async () => {
      const APIRequest = await foodAPIRequest('lookup', `i=${id}`);
      setAPIState(APIRequest);
    };
    getAPIdata();
  }, []);

  // const keysOfApi = () => {
  //   const APIStateKeys = Object.keys(APIState);
  //   const ingredientsKeys = APIStateKeys
  //     .filter((chaves) => chaves.includes('strIngredients'))
  //     .map((ingredient) => APIState[ingredient]);
  //   return ingredientsKeys;
  // };
  const obj = Object.keys(APIState)
    .filter((keyIngredient) => keyIngredient.includes('strIngredients'));

  return APIState.length === 0 ? <Loading /> : (
    <div>
      { console.log(obj) }
      { obj.map((ingredient, i) => <p key={ i }>{APIState[ingredient]}</p>) }
    </div>
  );
};

DetalheComidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DetalheComidas;
