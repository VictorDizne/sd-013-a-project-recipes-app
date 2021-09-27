import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { Button } from '../components';
import { profileIcon, searchIcon } from '../images';

function HandleHeader({ title }) {
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

  if (title !== 'Bebidas' || title !== 'Comidas' || title !== 'Explorar Orígem') {
    return (
      <div>
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
          <img
            src={ BsArrowReturnLeft }
            alt="Back Icon"
            className="BackBtn"
          />
        </button>
      </div>
    );
  }

  return (
    <div>
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
        onClick={ onClickSearch }
      >
        <img
          src={ searchIcon }
          alt="Search Icon"
          className="searchBarBtn"
        />
      </button>
    </div>
  );
}

const { string } = PropTypes;

HandleHeader.propTypes = {
  title: string,
}.isRequired;

export default HandleHeader;
