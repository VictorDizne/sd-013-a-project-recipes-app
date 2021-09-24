import React from 'react';
import { Container } from 'react-bootstrap';
import Provider from './context/Provider';
import Routes from './components/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider>
      <Container fluid>
        <Routes />
      </Container>
    </Provider>
  );
}

export default App;
