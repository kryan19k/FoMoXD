import React, { useState } from 'react';
import { CubeNftDiv } from './style';

const CubeNft = (props: {
  info: {
    name?: string;
    description?: string;
    url?: string;
    image?: string;
  };
  key: number;
}) => {
  const { name, url, image } = props?.info;

  // const [onOff, setOnOff] = useState(props?.info?.onOff);
  // const onClickHandler = () => {
  //   onOff
  //     ? new Audio('/sounds/mobile_phone_C.mp3').play()
  //     : new Audio('/sounds/mobile_phone_O.mp3').play();
  //   setOnOff(!onOff);
  // };
  return (
    // <CubeNftDiv onClick={onClickHandler} OffOnClass={onOff} url={`${NFT_BASE_URL}/${id}.png`}>
    // <CubeNftDiv onClick={onClickHandler} OffOnClass={onOff} url={`${image || url}`}>
    <CubeNftDiv url={`${image || url}`}>
      <div className="cube-info-wrapper" key={props.key}>
        <div className="cube-icon-wrapper">{/* <h1 className="cube-icon">{icon}</h1> */}</div>
        {/* <h2 className="cube-name">{title?.toLocaleUpperCase()}</h2>
        {state ? (
          <div className="cube-description">
            <div>{state}</div>
          </div>
        ) : (
          ""
        )}
        {connection ? <div className="cube-connection">{connection}</div> : ""} */}
      </div>
    </CubeNftDiv>
  );
};

export default CubeNft;
