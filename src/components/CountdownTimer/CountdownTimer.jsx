import { useRef, useEffect } from "react";
import Countdown, { zeroPad } from "react-countdown";
import "./CountdownTimer.css";

function CountdownTimer({ isPaused, expiry, onComplete, className }) {
  const countdown = useRef(null);

  useEffect(() => {
    if (isPaused) countdown.current.pause();
    else countdown.current.start();
  }, [isPaused]);

  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <span>
        {hours ? `${zeroPad(hours)}:` : ""}
        {`${zeroPad(minutes)}:${zeroPad(seconds)}`}
      </span>
    );
  };

  return (
    <span className={`countdown ${className}`}>
      <Countdown
        ref={countdown}
        date={expiry}
        renderer={renderer}
        onComplete={onComplete}
      />
    </span>
  );
}

export default CountdownTimer;
