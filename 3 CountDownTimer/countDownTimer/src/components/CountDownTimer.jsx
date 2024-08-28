import { useEffect, useRef, useState } from "react";

export default function CountDownTimer({ intialTime, onTimeFinsh }) {
  const [time, setTime] = useState(intialTime);
  const [isRunning, setIsrunning] = useState(true);
  const timerRefrence = useRef();
  useEffect(() => {
    if (isRunning) {
      timerRefrence.current = setInterval(() => {
        setTime((prev) => {
          if (prev === 0) {
            setIsrunning(false);
            clearInterval(timerRefrence.current);

            if (onTimeFinsh) {
              onTimeFinsh();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRefrence.current);
    }
    return () => clearInterval(timerRefrence.current);
  }, [isRunning, onTimeFinsh, time]);

  const handlePauseResume = () => {
    setIsrunning((prev) => !prev);
  };
  const handleReset = () => {
    setTime(intialTime);
    // setIsrunning(false);
    clearInterval(timerRefrence.current);
  };
  const handleStart = () => {
    setIsrunning(true);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return (
    <>
      <p>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </p>

      <button onClick={handlePauseResume}>
        {isRunning ? "Pause" : "resume"}
      </button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleStart}>Start</button>
    </>
  );
}
