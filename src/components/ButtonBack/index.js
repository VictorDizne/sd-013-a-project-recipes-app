import React from 'react';
import { useHistory } from 'react-router-dom';

import style from './buttonBack.module.scss';

function ButtonBack() {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <button
      className={ style.buttonBack }
      type="button"
      onClick={ goBack }
    >
      &#129044;
    </button>
  );
}

export default ButtonBack;
