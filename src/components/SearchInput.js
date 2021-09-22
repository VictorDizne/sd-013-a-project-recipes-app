import React from 'react';

function SearchInput() {
  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Buscar Receita"
      />
    </div>
  );
}

export default SearchInput;
