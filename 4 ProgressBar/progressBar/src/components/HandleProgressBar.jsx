import { useState } from "react";
import ProgressBar from "./ProgressBar";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import "./ProgressBar.css";
// ... import other form steps

export default function HandleProgressBar() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Initialize form data
    name: "",
    age: "",
    address: "",
    // ... other form fields
  });
  const handleStep = (step) => {
    setActiveStep(step);
  };
  //note this, so cool
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const steps = [
    {
      label: "Step 1",
      component: <FormStep1 formData={formData} handleChange={handleChange} />,
    },
    {
      label: "Step 2",
      component: <FormStep2 formData={formData} handleChange={handleChange} />,
    },
    // ... add other steps similarly
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <>
      <div className="step-progress-bar-container">
        <ProgressBar
          steps={steps.map((step) => step.label)}
          activeStep={activeStep}
          handleStep={handleStep}
        />
        <form onSubmit={handleSubmit}>
          {steps[activeStep].component}
          {activeStep === steps.length - 1 && (
            <button type="submit">Submit</button>
          )}
        </form>
      </div>
    </>
  );
}
