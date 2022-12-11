import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';

import './index.css';

const BaseInput = (props: any, ref: any) => {
  return (
    <div className="from-input">
      <label htmlFor={props.label}>{props.text}</label>
      <input {...props} value={props.value} disabled={true} />
    </div>
  );
};

export default forwardRef(BaseInput);
