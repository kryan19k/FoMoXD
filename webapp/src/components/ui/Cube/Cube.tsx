import React, { useState } from 'react';
import { CubeDiv } from './style';

const Cube = (props: {
  info: {
    icon?: string;
    title?: string;
    id?: string;
    connection?: string;
  };
  state: boolean;
  onClick: any;
}) => {
  const { icon, title, id, connection } = props.info;
  return (
    <CubeDiv onClick={props.onClick} OffOnClass={props.state}>
      <div className="cube-info-wrapper" key={id}>
        <div className="cube-icon-wrapper">
          <h1 className="cube-icon">{icon}</h1>
        </div>
        <h2 className="cube-name">{title?.toLocaleUpperCase()}</h2>
        {props?.state ? (
          <div className="cube-description">
            <div>{props?.state}</div>
          </div>
        ) : (
          ''
        )}
        {connection ? <div className="cube-connection">{connection}</div> : ''}
      </div>
    </CubeDiv>
  );
};

export default Cube;
