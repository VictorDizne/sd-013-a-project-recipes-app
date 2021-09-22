import React from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySearchBar: false,
    };
    this.handleState = this.handleState.bind(this);
  }

  handleState() {
    const { displaySearchBar } = this.state;
    this.setState({ displaySearchBar: !displaySearchBar });
  }

  render() {
    const { displaySearchBar } = this.state;
    const { titleHeader, id } = this.props;
    const buttonElement = (
      <div>
        <button
          className="search-button"
          type="button"
          onClick={ this.handleState }
        >
          <img
            className="search-image"
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search"
          />
        </button>
        { displaySearchBar
        && <input data-testid="search-input" type="text" name="searchBar" value="" /> }
      </div>

    );
    return (
      <header
        className="header"
      >
        <div
          className="main-header"
        >
          <Link
            to="/perfil"
          >
            <img
              className="profileIcon"
              data-testid="profile-top-btn"
              alt="profileIcon"
              src={ profileIcon }
            />
          </Link>
          <span
            data-testid="page-title"
          >
            {titleHeader}
          </span>
          {id === '0' ? buttonElement : null}
          { /* ternario para renderização do botão search de acordo com o valor do id */}
        </div>
      </header>
    );
  }
}

Header.propTypes = ({
  titleHeader: string, // string foi descontruida na importação = proptypes.string
}).isRequired;

export default Header;
