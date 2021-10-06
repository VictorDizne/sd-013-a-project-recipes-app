import styled from 'styled-components';

const Main = styled.main`
  display: flex;
  flex-direction: column;

  img {
    width: 100vw;
  }

  .recipe-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  background-color: #ffffffdd;

    div:nth-child(1) {
      color: black;
      /* background-color: green; */
      margin: 5px 15px;
    }

    div:nth-child(2) {
      /* background-color: blue; */
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 60%;
      height: 40px;
      padding: 5px 25px;

      .alert {
        display: flex;
        width: fit-content;
        padding: 4px;
        box-shadow: 1px 1px 2px 1px #ffffff67;
        color: #fff;
        padding: 4px 4px;
        border: 1px solid #ffffffe6;
        background-color: #161616;
        border-radius: 6px;
        position: relative;
        /* z-index: 2; */
        top: -40px;
        left: -70px;
      }
    }
  }

  .continueBtn {
    position: fixed;
    bottom: 0;
  }
`;

export default Main;
