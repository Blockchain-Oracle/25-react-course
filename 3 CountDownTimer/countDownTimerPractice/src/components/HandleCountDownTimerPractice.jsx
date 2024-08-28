import CountDownTimer from "./CountDownTimer";

export default function HandleCountDownTimerPractice() {
  const handleCountDownFinsh = () => {
    console.log("do something timeDown ends");
  };
  return (
    <div>
      <h1>CountDown Timer</h1>
      <CountDownTimer
        intialTime={280}
        onFinshCountDown={handleCountDownFinsh}
      />
    </div>
  );
}
