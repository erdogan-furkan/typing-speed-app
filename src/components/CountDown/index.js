import "./styles.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch } from "react-redux";
import { setFinished } from "../../redux/words/wordsSlice";

const renderTime = ({ remainingTime, elapsedTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Your time is up</div>;
  }

  return (
    <div className="timer">
      <div className="text">{elapsedTime ? "Remaining" : "You have"}</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};

function CountDown({ start }) {
  const dispatch = useDispatch();

  return (
    <CountdownCircleTimer
      isPlaying={start}
      duration={60}
      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
      colorsTime={[60, 45, 30, 15]}
      onComplete={() => dispatch(setFinished())}
    >
      {renderTime}
    </CountdownCircleTimer>
  );
}

export default CountDown;
