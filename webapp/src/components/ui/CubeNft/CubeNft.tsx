import React, { useState } from 'react';
import { CubeNftDiv } from './style';
import config from '../../../config';
const { NFT_BASE_URL } = config;

const CubeNft = (props: {
  info: {
    icon?: string;
    title?: string;
    id?: string;
    state?: string;
    connection?: string;
    onOff?: boolean;
    url?: string;
  };
}) => {
  const { icon, title, id, state, connection, url } = props.info;
  const [onOff, setOnOff] = useState(props.info.onOff);
  const onClickHandler = () => {
    onOff
      ? new Audio('/sounds/mobile_phone_C.mp3').play()
      : new Audio('/sounds/mobile_phone_O.mp3').play();
    setOnOff(!onOff);
  };
  return (
    // <CubeNftDiv onClick={onClickHandler} OffOnClass={onOff} url={`${NFT_BASE_URL}/${id}.png`}>
    <CubeNftDiv onClick={onClickHandler} OffOnClass={onOff} url={`${url}`}>
      <div className="cube-info-wrapper" key={id}>
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
