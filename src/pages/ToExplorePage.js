import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

import { Link } from 'react-router-dom';

function ToExplorePage() {
  return (
    <div>
      <Header title="Explorar" />
      <Link to='/explorar/comidas'>
        <button>
          Explorar Comidas
        </button>
      </Link> 

      <Link to='/explorar/bebidas'> 
        <button>
          Explorar Bebidas
        </button>
      </Link>  
      <Footer />
    </div>
  );
}

export default ToExplorePage;
