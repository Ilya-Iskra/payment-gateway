import Countdown, { zeroPad } from "react-countdown";
import "./CountdownTimer.css";

function CountdownTimer({ expiry, onComplete, className }) {
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
      <Countdown date={expiry} renderer={renderer} onComplete={onComplete} />
    </span>
  );
}

export default CountdownTimer;
