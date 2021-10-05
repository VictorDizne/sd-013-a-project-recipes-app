import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import propTypes from 'prop-types';
import appContext from '../contexts/appContext';

const CommentCards = ({ id }) => {
  const { setRefresh, refreshComments } = useContext(appContext);
  const comments = JSON.parse(sessionStorage.getItem(id));
  const [commentsArr, setCommentsArr] = useState([]);

  useEffect(() => {
    setCommentsArr(comments);
  }, []);

  useEffect(() => {
    if (refreshComments) {
      setCommentsArr(comments);
      return setRefresh(false);
    }
  }, [refreshComments, setRefresh]);

  const comentaryNull = () => (
    <Card>
      <Card.Body>
        <Card.Title>Não há comentários!</Card.Title>
      </Card.Body>
    </Card>
  );

  return (
    <Row xs={ 1 } md={ 1 } className="g-4">
      {
        !commentsArr
          ? comentaryNull()
          : commentsArr.map(({ email, comment }, i) => (
            <Col key={ i }>
              <Card>
                <Card.Body>
                  <Card.Title>{ email }</Card.Title>
                  <Card.Text>
                    { comment }
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
      }
    </Row>
  );
};

CommentCards.propTypes = {
  id: propTypes.string.isRequired,
};

export default CommentCards;
