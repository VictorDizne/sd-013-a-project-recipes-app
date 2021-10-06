import React, { useContext, useState } from 'react';
import Proptypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import arrowRight from '../images/right-arrow.png';
import appContext from '../contexts/appContext';

const CommentForm = ({ id, sendButtonVariant }) => {
  const [comment, setComment] = useState('');
  const { setRefresh } = useContext(appContext);

  const saveCommentary = () => {
    const { email } = JSON.parse(localStorage.getItem('user')); // pega email

    const commentObj = { email, comment }; // objeto que irá sustentar as infos do comentário

    if (sessionStorage[id]) { // se já houver comentários naquela receita...
      const commentArray = JSON.parse(sessionStorage[id]);
      sessionStorage[id] = JSON.stringify([...commentArray, commentObj]);
    } else { // ... senão crie
      sessionStorage[id] = JSON.stringify([commentObj]);
    }
    setRefresh(true);
    setComment('');
  };

  return (
    <div>
      <TextField
        id="outlined-multiline-flexible"
        label="Comente!"
        multiline
        rows={ 5 }
        fullWidth
        style={ { marginBottom: '10px' } }
        size="medium"
        onChange={ ({ target }) => setComment(target.value) }
        value={ comment }
      />
      <div
        style={ { display: 'flex', flexDirection: 'row-reverse' } }
      >
        <Button
          variant="contained"
          color={ sendButtonVariant }
          onClick={ saveCommentary }
        >
          Send
          <img src={ arrowRight } alt="ícone" style={ { width: '18px' } } />
        </Button>
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  id: Proptypes.string.isRequired,
  sendButtonVariant: Proptypes.string.isRequired,
};

export default CommentForm;
