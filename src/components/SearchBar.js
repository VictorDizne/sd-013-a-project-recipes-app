import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: '',
      searchRadio: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { searchBar } = this.state;
    const searchElements = (
      <div
        className="headerSearch"
      >
        <input
          data-testid="search-input"
          type="text"
          name="searchBar"
          value={ searchBar }
          onChange={ this.handleChange }
        />
        <div
          className="search-radio"
        >
          <label
            htmlFor="ingredient"
          >
            <input
              id="ingredient"
              data-testid="ingredient-search-radio"
              type="radio"
              name="searchRadio"
              value="ingredient"
              onChange={ this.handleChange }
            />
            Ingrediente
          </label>

          <label
            htmlFor="name"
          >
            <input
              id="name"
              data-testid="name-search-radio"
              type="radio"
              name="searchRadio"
              value="name"
              onChange={ this.handleChange }
            />
            Nome
          </label>
          <label
            htmlFor="letter"
          >
            <input
              id="letter"
              data-testid="first-letter-search-radio"
              type="radio"
              name="searchRadio"
              value="firstLetter"
              onChange={ this.handleChange }
            />
            Primeira letra
          </label>
          <button
            data-testid="exec-search-btn"
            type="button"
          >
            buscar
          </button>
        </div>
      </div>
    );
    return (
      searchElements
    );
  }
}

export default SearchBar;
