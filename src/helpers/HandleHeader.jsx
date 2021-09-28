import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { Button } from '../components';
import { profileIcon, searchIcon } from '../images';

function HandleHeader({ title, setSearchBarStatus }) {
  const history = useHistory();

  const onClickBack = () => history.goBack();
  const onClickProfile = () => history.push('/perfil');

  const profileButton = (
    <Button
      className="profileIconBtn"
      onClick={ onClickProfile }
      buttonText={
        <img
          data-testid="profile-top-btn"
          className="profileIcon"
          src={ profileIcon }
          alt="Profile Icon"
        />
      }
    />
  );

  if (title !== 'Bebidas' && title !== 'Comidas' && title !== 'Explorar Orígem') {
    return (
      <nav>
        { profileButton }
        <h1
          className="headerTitle"
          data-testid="page-title"
        >
          { title }
        </h1>
        <button
          type="button"
          onClick={ onClickBack }
        >
          <div
            className="BackBtn"
          >
            <BsArrowReturnLeft />
          </div>
        </button>
      </nav>
    );
  }

  return (
    <nav>
      { profileButton }
      <h1
        className="headerTitle"
        data-testid="page-title"
      >
        { title }
      </h1>
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ () => setSearchBarStatus((prevState) => !prevState) }
      >
        <img
          src={ searchIcon }
          alt="Search Icon"
          className="searchBarBtn"
        />
      </button>
    </nav>
  );
}

const { string, func } = PropTypes;

HandleHeader.propTypes = {
  title: string,
  setSearchBarStatus: func,
}.isRequired;

export default HandleHeader;
