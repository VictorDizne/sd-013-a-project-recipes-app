import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { TextField, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import RecipesContext from '../context/RecipesContext';

const SearchBar = ({ isMeal }) => {
  const [input, setInput] = useState('');
  const [radio, setRadio] = useState('Ingrediente');
  const { handleBtnClick } = useContext(RecipesContext);

  return (
    <div className="search-bar">
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
      <Button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleBtnClick({ input, isMeal, radio }) }
        variant="contained"
        fullWidth
      >
        Buscar
      </Button>
    </div>
  );
};

SearchBar.propTypes = {
  isMeal: PropTypes.bool.isRequired,
};

export default SearchBar;
