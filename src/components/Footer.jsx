import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Button } from '.';
import { drinkIcon, exploreIcon, mealIcon } from '../images';

const StyledFooter = styled.footer`
  background: #C4C4C4;
  display: flex;
  position: absolute;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 58px;
  top: calc(100vh - 58px);
  left: 0;
  img {
    margin: -10px;
  }
`;

function Footer() {
  const history = useHistory();

  return (
    <StyledFooter className="footer" data-testid="footer">
      <Button
        id="food-bottom-btn"
        onClick={ () => history.push('/comidas') }
        buttonType="BackgroundButton"
        buttonText={
          <img
            src={ mealIcon }
            alt="Fork and spoon Icon"
            className="foodsBtnIcon"
          />
        }
      />
      <Button
        id="explore-bottom-btn"
        onClick={ () => history.push('/explorar') }
        buttonType="BackgroundButton"
        buttonText={
          <img
            src={ exploreIcon }
            alt="Compass Icon"
            className="foodsBtnIcon"
          />
        }
      />
      <Button
        id="drinks-bottom-btn"
        onClick={ () => history.push('/bebidas') }
        buttonType="BackgroundButton"
        buttonText={
          <img
            src={ drinkIcon }
            alt="Drink Icon"
            className="foodsBtnIcon"
          />
        }
      />
    </StyledFooter>
  );
}

export default Footer;
