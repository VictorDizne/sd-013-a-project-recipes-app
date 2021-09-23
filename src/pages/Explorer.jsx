import React from 'react';

import { Link } from 'react-router-dom';

// import { Header, Footer } from '../components';

const Explorer = () => (
  <div>

    {/* <Header /> */ }

    <Link to="/comidas">
      <button data-testid="explore-food" type="button">
        Explorar Comidas
      </button>
    </Link>

    <Link to="/bebidas">
      <button data-testid="explore-drinks" type="button">
        Explorar Bebidas
      </button>
    </Link>

    {/* <Footer /> */ }

  </div>
);

export default Explorer;
