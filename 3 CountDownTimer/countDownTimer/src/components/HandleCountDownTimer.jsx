import CountDownTimer from "./CountDownTimer";

export default function HandleCountDownTimer() {
  const handleonTimeFinsh = () => {
    console.log("timer finsh set new Timer");
  };
  return (
    <div>
      <CountDownTimer intialTime={322} onTimeFinsh={handleonTimeFinsh} />
    </div>
  );
}
