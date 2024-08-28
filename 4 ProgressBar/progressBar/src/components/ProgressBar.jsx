export default function ProgressBar({ steps, activeStep, handleStep }) {
  const stepGenerator =
    steps && steps.length > 0
      ? steps.map((stepItem, index) => (
          <div
            className={`step ${index <= activeStep ? "active" : ""}`}
            key={index}
          >
            <div className="step-circle">{index + 1}</div>
            <div className="step-label">{stepItem}</div>
          </div>
        ))
      : null;

  const handlePrevious = () => {
    handleStep(activeStep - 1);
  };

  const handleNext = () => {
    handleStep(activeStep + 1);
  };

  return (
    <div>
      <div className="step-container">{stepGenerator}</div>

      <div className="step-button-wrapper">
        <button disabled={activeStep === 0} onClick={handlePrevious}>
          Previous
        </button>
        <button disabled={activeStep === steps.length - 1} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}
