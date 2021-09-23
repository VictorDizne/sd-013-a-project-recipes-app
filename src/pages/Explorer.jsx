import React from 'react';

import { Link } from 'react-router-dom';

const Explorer = () => (
  <div>

    <Link to="/comidas">
      <button data-testid="explore-food" type="button">
        Explorar Comidas
      </button>
    </Link>

    <Link to="/comidas">
      <button data-testid="explore-drinks" type="button">
        Explorar Bebidas
      </button>
    </Link>

  </div>
);

export default Explorer;
