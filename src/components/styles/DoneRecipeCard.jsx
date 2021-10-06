import styled from 'styled-components';

const DoneRecipeCard = styled.div`
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 1px 1px 3px 1px #ffffff67;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  border-radius: 6px;
  border: 1px solid #ffffff75;
  margin-bottom: 10px;
  width: 93vw;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */

  .favCardImage {
    width: 50%;
    img {
      border-radius: 6px 0px 0px 6px;
      vertical-align: middle;
      width: 180px;
    }
  }

  .favCardDetails {
    width: 50%;
    background-color: #dfdfdf;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 0px 6px 6px 0px;
  }

  .infos {
    * {
      color: black;
    }
    height: 75%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0px 8px;
  }

  .share {

    display: flex;
    height: 20%;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
  }
  
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

  .favTag {
    color: white;
    padding: 4px 4px;
    border: 1px solid #ffffffe6;
    background-color: #161616;
    border-radius: 6px;
  }
`;

export default DoneRecipeCard;
