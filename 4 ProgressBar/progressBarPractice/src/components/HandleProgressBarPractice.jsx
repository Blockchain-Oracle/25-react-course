import { useState } from "react";
import ProgressBarPractice from "./ProgressBarPractice";

export default function HandleProgressBarPractice() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["step 1", "step 2", "step 3", "step 4", "step 5"];
  const handleonChangeStep = (step) => {
    setActiveStep(step);
  };
  return (
    <div>
      <ProgressBarPractice
        activeStep={activeStep}
        onChangeStep={handleonChangeStep}
        step={steps}
      />
    </div>
  );
}
