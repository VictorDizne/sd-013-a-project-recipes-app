import React from 'react';
import { string } from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { titleHeader, id } = this.props;
    const buttonElement = (
      <button
        className="search-button"
        type="button"
      >
        <img
          className="search-image"
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="search"
        />
      </button>
    );
    return (
      <header
        className="header"
      >
        <div
          className="main-header"
        >
          <img
            className="profileIcon"
            data-testid="profile-top-btn"
            alt="profileIcon"
            src={ profileIcon }
          />
          <span
            data-testid="page-title"
          >
            {titleHeader}
          </span>
          {id === '0' ? buttonElement : null}
          { /* ternario para renderização do botão search de acordo com o valor do id */ }
        </div>
      </header>
    );
  }
}

Header.propTypes = ({
  titleHeader: string, // string foi descontruida na importação = proptypes.string
}).isRequired;

export default Header;
