import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import RecipesContext from '../../context/RecipesContext';

import style from './searchBar.module.scss';

const SearchBar = ({ isMeal, handleSearchBtnClick }) => {
  const [input, setInput] = useState('');
  const [radio, setRadio] = useState('Ingrediente');
  const { handleBtnClick } = useContext(RecipesContext);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    handleBtnClick({ input, isMeal, radio });
    handleSearchBtnClick();
  };

  return (
    <div
      className={ style.modalBackground }
    >
      <form onSubmit={ handleSubmitSearch }>
        <button
          type="button"
          className={ style.closeModal }
          onClick={ handleSearchBtnClick }
        >
          X
        </button>
        <TextField
          id="search-text-input"
          label="Procurar"
          variant="outlined"
          value={ input }
          onChange={ ({ target }) => setInput(target.value) }
          type="text"
          size="small"
          margin="dense"
          inputProps={ {
            'data-testid': 'search-input',
          } }
          fullWidth
        />
        <RadioGroup
          aria-label="ingredient"
          defaultValue="Ingrediente"
          name="radio-buttons-group"
          onChange={ ({ target }) => setRadio(target.value) }
        >
          <FormControlLabel
            value="Ingrediente"
            control={ <Radio /> }
            label="Ingrediente"
            data-testid="ingredient-search-radio"
          />
          <FormControlLabel
            value="Nome"
            control={ <Radio /> }
            label="Nome"
            data-testid="name-search-radio"
          />
          <FormControlLabel
            value="Primeira Letra"
            control={ <Radio /> }
            label="Primeira Letra"
            data-testid="first-letter-search-radio"
          />
        </RadioGroup>
        <button
          type="submit"
          data-testid="exec-search-btn"
          onClick={ handleSubmitSearch }
          className={ style.submitButton }
        >
          Buscar
        </button>
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  isMeal: PropTypes.bool.isRequired,
  handleSearchBtnClick: PropTypes.func.isRequired,
};

export default SearchBar;
