import { useEffect, useState } from "react";

export default function CountDownTimer({ intialTime, onFinshCountDown }) {
  const [timer, setTimer] = useState(intialTime);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  useEffect(() => {
    const timeCounterInterval = setInterval(() => {
      if (isTimerRunning) {
        setTimer((prev) => {
          if (prev === 0) {
            setIsTimerRunning(false);
            clearInterval(timeCounterInterval);
            if (onFinshCountDown) {
              onFinshCountDown();
            }
          }
          return prev - 1;
        });
      } else {
        clearInterval(timeCounterInterval);
      }
    }, 1000);
    return () => clearInterval(timeCounterInterval);
  }, [onFinshCountDown, timer, isTimerRunning]);

  const handlePauseResume = () => {
    setIsTimerRunning((prev) => !prev);
  };
  const handleReset = () => {
    /*
     * didnt clear interval here
       thats one of question to ask ai
      because i didnt use ref
      everything works just fine like with useRef
     */

    setTimer(intialTime);
  };

  const handleStart = () => {
    setIsTimerRunning(true);
  };
  const getMiniutes = Math.floor(timer / 60);
  const getSeconds = timer % 60;
  return (
    <div>
      <p>
        {String(getMiniutes).padStart(0, "2")}:
        {String(getSeconds).padStart(2, "0")}
      </p>
      <button onClick={handlePauseResume}>
        {isTimerRunning ? "Pause" : "Resume"}
      </button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleStart}>Start</button>
    </div>
  );
}
