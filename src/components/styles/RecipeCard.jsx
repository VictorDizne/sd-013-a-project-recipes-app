import styled from 'styled-components';

const RecipeCard = styled.div`
  /* background-color: #ffffff; */
  border-radius: 6px;
  box-shadow: 1px 1px 3px 1px #ffffff67;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  border-radius: 6px;
  border: 1px solid #ffffff75;
  margin-bottom: 10px;

  img {
    border-radius: 6px 6px 0px 0px;
    width: 45vw;
  }

  h3 {
    color: #ffffff;
    padding: 4px 6px;
    max-width: 45vw;
  }
`;

export default RecipeCard;
