import React from 'react';
import PropTypes from 'prop-types';
import HandleHeader from '../helpers/HandleHeader';

function Header({ title, setSearchBarStatus }) {
  return (
    <header>
      <HandleHeader title={ title } />
    </header>
  );
}

const { string, func } = PropTypes;

Header.propTypes = {
  title: string,
  setSearchBarStatus: func,
}.isRequired;

export default Header;
