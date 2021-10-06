import styled from 'styled-components';

const Main = styled.main`
  margin: 58px 0;
  /* height: 50vh; */
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  justify-content: center;
  align-items: center;

  p {
    margin: 15px 10px 0px 10px;
    color: #fff;
    font-size: 1.4rem;
  }

  .container-button {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 10px;

    button {
    font-size: 1.1rem;
    width: 120px;
    height: 60px;
    margin: 5px;
    }
  }

`;

export default Main;
