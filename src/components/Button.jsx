import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonWithBackground = styled.button`
  background: ${(props) => (props.icon ? `url(${props.icon})` : 'none')};
  display: block;
  background-size: 100%;
  background-size: cover;
  /* width: 30px; */
  /* height: 30px; */
  margin: 0 10px;
  /* border: 1px solid white; */
  border: none;

  .return-btn {
    width: 30px;
    height: 30px;
    background-color: white;
  }
`;

const ButtonWithFilter = styled.button`
  box-shadow: 1px 1px 2px 1px #ffffff67;
  color: #fff;
  padding: 4px 4px;
  border: 1px solid #ffffffab;
  border-radius: 4px;
  background: none;
  margin: 4px;
  font-size: 1rem;

  /* &:hover {
    box-shadow: 1px 1px 3px 1px #ffffff;
    border: 1px solid #ffffff;
    color: #ffffff;
  } */
`;

const Button = (
  { name, id, icon, type, className, disabled = false, onClick, buttonText, buttonType },
) => {
  const BackgroundButton = (
    <ButtonWithBackground
      name={ name }
      id={ id }
      icon={ icon }
      className={ className }
      data-testid={ id }
      type={ type === 'submit' ? 'submit' : 'button' }
      disabled={ disabled }
      onClick={ onClick }
    >
      { buttonText }
    </ButtonWithBackground>
  );
  const FilterButton = (
    <ButtonWithFilter
      name={ name }
      id={ id }
      className={ className }
      data-testid={ id }
      type={ type === 'submit' ? 'submit' : 'button' }
      disabled={ disabled }
      onClick={ onClick }
    >
      { buttonText }
    </ButtonWithFilter>
  );

  return buttonType === 'BackgroundButton' ? BackgroundButton : FilterButton;
};

Button.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  icon: PropTypes.node,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
}.isRequired;

export default Button;
