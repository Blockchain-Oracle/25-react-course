export default function ProgressBarPractice({
  activeStep,
  step,
  onChangeStep,
}) {
  const widthSettings = (100 / (step.length - activeStep)) * 6;
  const stepGroup =
    step && step.length > 0
      ? step.map((steps, index) => (
          <div key={index} style={{ width: widthSettings }}>
            {steps}
          </div>
        ))
      : null;
  const handlePrev = () => {
    onChangeStep(activeStep - 1);
  };

  const handleNext = () => {
    onChangeStep(activeStep + 1);
  };
  return (
    <div>
      {stepGroup}
      <button disabled={activeStep === 0} onClick={handlePrev}>
        Prev
      </button>
      <button disabled={activeStep === step.length - 1} onClick={handleNext}>
        Next
      </button>
    </div>
  );
}
