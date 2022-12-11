import React from 'react';

const DateTimeDisplay = (props:any) => {
  const { value, type, isDanger } = props;
  return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
