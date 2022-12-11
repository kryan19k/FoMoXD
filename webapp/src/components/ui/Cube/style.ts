import styled from "styled-components"
export const CubeDiv = styled.div<{ OffOnClass?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  position: relative;
  margin: 20px;
  max-width: 220px;
  max-height: 225px;
  width: 150px;
  height: 150px;
  border-radius: 4%;
  border: 3px solid #ffffff;
  box-shadow: 0px 4px 4px 0px #00000040;
  -webkit-border-radius: 4%;
  -moz-border-radius: 4%;
  -ms-border-radius: 4%;
  -o-border-radius: 4%;
  background: ${(props) =>
    props.OffOnClass ? "var(--pop-color)" : "var(---background-dark)"};
  color: ${(props) => (props.OffOnClass ? "var(---background-dark)" : "white")};
  padding-bottom: 15px;

  &:hover {
    transform: scale(1.1);
    background: ${(props) => (props.OffOnClass ? "#ffc400" : "#4d4d4d")};
    box-shadow: 0px 8px 15px 4px #00000040;
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
  }

  &:active {
    box-shadow: ${(props) =>
      props.OffOnClass ? "" : "0px 0px 25px 5px #00ffff"};
    background: ${(props) => (props.OffOnClass ? "" : "rgb(236, 254, 255)")};
  }

  .cube-info-wrapper {
    margin: 3px 5px;
    padding: 0;
  }

  .cube-icon-wrapper {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cube-icon {
    font-size: 55px;
    margin: 0px;
    margin-bottom: -15px;
    text-align: center;
  }

  .cube-name {
    font-style: normal;
    font-weight: 900;
    font-size: 16px;
    line-height: 100%;
    text-align: center;
    letter-spacing: 0.08em;
    margin: 0px;
  }

  .cube-description {
    @media (max-width: 1000px) {
      display: none;
    }
    font-style: thin;
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
    text-align: center;
    letter-spacing: 0em;
    margin: 10px;
  }

  .cube-connection {
    @media (max-width: 1100px) {
      display: none;
    }
    font-size: 14px;
    font-weight: 400;
    line-height: 100%;
    text-align: center;
    color: #ffffff;
    margin-top: 10px;
  }
`
