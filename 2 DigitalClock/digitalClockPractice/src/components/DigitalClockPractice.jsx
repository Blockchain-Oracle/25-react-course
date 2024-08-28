import { useEffect, useRef, useState } from "react";

export default function DigitalClockPractice() {
  const [date, setDate] = useState(new Date());
  const dateRef = useRef();
  useEffect(() => {
    dateRef.current = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(dateRef.current);
  }, []);
  return (
    <div>
      <h1>Digital Clock</h1>
      <div className="clock">
        <span>{date.getHours().toString().padStart(2, "0")}</span>:
        <span>{date.getMinutes().toString().padStart(2, "0")}</span>:
        <span>{date.getSeconds().toString().padStart(2, "0")}</span>
      </div>
      <div>
        <span>{date.toLocaleString("en-us", { weekday: "long" })}</span>
        <span>{date.getDate()}</span>,{date.getFullYear()}
      </div>
    </div>
  );
}
