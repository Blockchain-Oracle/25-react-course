import "./digitalClock.css";
import { useState, useEffect } from "react";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="digital-clock">
      <h1>Digital Clock</h1>
      <div className="clock">
        <span>{time.getHours().toString().padStart(2, "0")}</span>:
        <span>{time.getMinutes().toString().padStart(2, "0")}</span>:
        <span>{time.getSeconds().toString().padStart(2, "0")}</span>
      </div>
      <div>
        <span>{time.toLocaleString("en-us", { weekday: "long" })}</span>
        <span>{time.getDate()}</span>,{time.getFullYear()}
      </div>
    </div>
  );
};

export default DigitalClock;
