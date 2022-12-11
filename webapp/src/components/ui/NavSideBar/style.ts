import styled from 'styled-components';
export const NavSideBarDiv = styled.div`
  height: 70px;
  width: 90vw;
  background: var(---background-dark);
  font-weight: 900;
  text-align: left;
  letter-spacing: 1px;
  display: flex;
  justify-content: space-between;
  margin: 0 5%;
  align-items: center;
  position: absolute;
  z-index: 5;
  border-radius: 0 0 25px 25px;
    color: white;

  a{
    color: white;
  }

  .message{
    min-width: 500px;
    width: 100%
    color: white;
    font-weight: 400;
    text-shadow: 0 0 5px #0078f0, 0 0 3px #0034ca
  }

  .nav-side-title-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
  }

  .nav-side-title-icon {
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 20px;
    font-size: 25px;
    border-right: 1px solid #8e8e8e;
    margin: 0 20px;
  }
  .nav-side-title-icon span{
    margin: 0 2px;
    text-shadow: 0 0 10px #DB147C, 0 0 10px purple;
  }

  .nav-bar {
    display: flex;
    align-items: center;
    justify-content: right;
    margin-right: 20px
  }

  .nav-bar-icon {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border: 1px solid rgb(68, 68, 68);
    border-radius: 50%;
    -webkit-border-radius: ;
    -moz-border-radius: ;
    -ms-border-radius: ;
    -o-border-radius: ;
    font-size: 30px;
    text-align: center;
    margin: 10px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .nav-bar-icon:hover {
    transform: scale(1.1);
    background: white;
    text-shadow: 1px 2px 1px black;
    box-shadow: 0px 8px 15px 5px #000000;
  }

  .add-button {
    font-size: 16px;
    color: grey;
    font-weight: 100;
    bottom: 40px;
    border: none;
    position: absolute;
    right: 20px;
    top : 10px
  }
  
  .add-button:hover {
    color: white;
    transform: scale(1.1);
  }

  @media only screen and (max-width: 626px) {
    .nav-side-title-icon, .message  {
      display: none;
    }
  }

  @media only screen and (max-width: 1026px) {
    .message {
      min-width: 150px;
    }
  }
`;
