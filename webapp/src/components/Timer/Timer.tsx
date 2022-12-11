import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import './Timer.css';
import DateTimeDisplay from './DateTimeDisplay';

const ExpiredNotice = (props: any) => {
  const isWinner = false;
  const isNFTOwner = false;
  if (props.isGameEnd) {
    if (isWinner) {
      return (
        <div className="expired-notice">
          <div className="puff">🤑</div>
          <span>You Won!!!</span>
          <p>You won everthing.</p>
        </div>
      );
    } else if (isNFTOwner) {
      return (
        <div className="expired-notice">
          <div className="puff">🖼️👨🏻‍🎨</div>
          <span>You Won NFTs!!!</span>
          <p>Got to your gallery.</p>
        </div>
      );
    } else {
      return (
        <div className="expired-notice">
          <div className="puff">💩</div>
          <span>Game Over!!!</span>
          <p>You won nothing but puffs.</p>
        </div>
      );
    }
  } else if (props.getTime) {
    return (
      <div className="expired-notice">
        <div className="puff">💨</div>
        <span>Run out of time</span>
        <p>Who ganna be the winner?</p>
      </div>
    );
  } else {
    return (
      <div className="expired-notice">
        <div className="puff">⏳</div>
        <span>Connect to get time</span>
        <p>Please connect with MetaMask.</p>
      </div>
    );
  }
};

const ShowCounter = (props: any) => {
  const { days, hours, minutes, seconds } = props;
  return (
    <div className="show-counter floating">
      <div className="puff">🧁</div>

      <a
        /* href="https://.com"
                target="_blank" */
        rel="noopener noreferrer"
        className="countdown-link">
        <DateTimeDisplay value={days} type={'Days'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={'Mins'} isDanger={minutes <= 3} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={minutes <= 3} />
      </a>
    </div>
  );
};

const CountdownTimer = (props: any) => {
  const [days, hours, minutes, seconds] = useCountdown(props.targetDate);
  if (props.isGameEnd) {
    return <ExpiredNotice getTime={true} isGameEnd={props.isGameEnd} />;
  } else {
    if (props.targetDate > 0 && minutes > 0) {
      return <ShowCounter days={days} hours={hours} minutes={minutes} seconds={seconds} />;
    } else if (props.targetDate <= 0) {
      return <ExpiredNotice getTime={false} isGameEnd={props.isGameEnd} />;
    } else {
      return <ExpiredNotice getTime={true} isGameEnd={props.isGameEnd} />;
    }
  }
};

export default CountdownTimer;
