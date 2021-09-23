import React from 'react';
import { Container } from 'react-bootstrap';
import Routes from './components/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Provider';

function App() {
  return (
    <Container fluid>
      <Provider>
        <Routes />
      </Provider>
    </Container>
  );
}

export default App;
