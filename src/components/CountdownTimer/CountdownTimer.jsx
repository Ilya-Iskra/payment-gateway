import Countdown from "react-countdown";
import "./CountdownTimer.css";

function CountdownTimer({ expiry, onComplete, className }) {
  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <span>
        {hours ? `${String(hours).padStart(2, "0")}:` : ""}
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
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
