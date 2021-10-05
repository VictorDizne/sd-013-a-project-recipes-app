import React, { useContext, useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import Proptypes from 'prop-types';
import appContext from '../contexts/appContext';

const CommentForm = ({ id }) => {
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
  };

  return (
    <div>
      <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={ { height: '150px', marginBottom: '10px' } }
          value={ comment }
          onChange={ ({ target }) => setComment(target.value) }
        />
      </FloatingLabel>
      <Button
        variant="outline-secondary"
        onClick={ saveCommentary }
      >
        Send
      </Button>
    </div>
  );
};

CommentForm.propTypes = {
  id: Proptypes.string.isRequired,
};

export default CommentForm;
