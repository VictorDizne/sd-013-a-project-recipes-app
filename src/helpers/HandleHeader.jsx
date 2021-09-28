import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { Button } from '../components';
import { profileIcon, searchIcon } from '../images';

const Nav = styled.nav`
  background: #C4C4C4;
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  width: 100vw;
  height: 58px;
  left: 0px;
  top: 0px;
`;

function HandleHeader({ title, setSearchBarStatus }) {
  const history = useHistory();

  const onClickBack = () => history.goBack();
  const onClickProfile = () => history.push('/perfil');

  const profileButton = (
    <Button
      className="profileIconBtn"
      buttonType="BackgroundButton"
      onClick={ onClickProfile }
      data-testid="profile-top-btn"
      icon={ profileIcon }
    />
  );

  if (title !== 'Bebidas' && title !== 'Comidas' && title !== 'Explorar Orígem') {
    return (
      <Nav>
        { profileButton }
        <h1
          className="headerTitle"
          data-testid="page-title"
        >
          { title }
        </h1>
        <Button
          type="button"
          onClick={ onClickBack }
          buttonType="BackgroundButton"
          buttonText={
            <BsArrowReturnLeft />
          }
        />
      </Nav>
    );
  }

  return (
    <Nav>
      { profileButton }
      <h1
        className="headerTitle"
        data-testid="page-title"
      >
        { title }
      </h1>
      <Button
        type="button"
        buttonType="BackgroundButton"
        icon={ searchIcon }
        data-testid="search-top-btn"
        onClick={ () => setSearchBarStatus((prevState) => !prevState) }
      />
    </Nav>
  );
}

const { string, func } = PropTypes;

HandleHeader.propTypes = {
  title: string,
  setSearchBarStatus: func,
}.isRequired;

export default HandleHeader;
