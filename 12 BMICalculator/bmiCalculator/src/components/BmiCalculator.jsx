import "./bmiCalculator.css";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCallback } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function BmiCalculator() {
  const [bmiResult, setBmiResult] = useState(0);
  const [bmiCategory, setBmiCategory] = useState("");

  const bmiCalculator = useCallback((height, weight) => {
    const heightInMeters = parseFloat(height) / 100;
    const result = parseFloat(weight) / heightInMeters ** 2;
    setBmiResult(result.toFixed(2));
    if (result < 18.5) {
      setBmiCategory("Underweight");
    } else if (result >= 18.5 && result < 25) {
      setBmiCategory("Normal weight");
    } else if (result >= 25 && result < 30) {
      setBmiCategory("Overweight");
    } else {
      setBmiCategory("Obese");
    }
  }, []);

  const getColor = (bmi) => {
    if (bmi < 18.5) return "#3498db"; // Blue for underweight
    if (bmi >= 18.5 && bmi < 25) return "#2ecc71"; // Green for normal
    if (bmi >= 25 && bmi < 30) return "#f1c40f"; // Yellow for overweight
    return "#e74c3c"; // Red for obese
  };

  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      bmiHeight: "",
      bmiWeight: "",
    },
    validationSchema: Yup.object({
      bmiHeight: Yup.number()
        .min(0, "enter value greater than 0")
        .required("value is required"),
      bmiWeight: Yup.number()
        .min(0, "enter value greater than 0")
        .required("value is required"),
    }),
    onSubmit: (values) => {
      bmiCalculator(values.bmiHeight, values.bmiWeight);
    },
  });

  return (
    <div className="bmiCalculator-container">
      <form onChange={handleSubmit} onSubmit={handleSubmit}>
        <div className="height-container">
          <label htmlFor="bmiHeight">Height (cm) </label>
          <input
            type="number"
            name="bmiHeight"
            id="bmiHeight"
            placeholder="Enter your height in cm"
            {...getFieldProps("bmiHeight")}
          />
        </div>

        <div className="weight-container">
          <label htmlFor="bmiWeight">Weight (kg) </label>
          <input
            type="number"
            name="bmiWeight"
            id="bmiWeight"
            placeholder="Enter your weight in kg"
            {...getFieldProps("bmiWeight")}
          />
        </div>
      </form>
      <div className="bmi-result-container">
        <CircularProgressbar
          value={bmiResult}
          text={`BMI = ${bmiResult}`}
          minValue={0}
          maxValue={40}
          styles={buildStyles({
            pathColor: getColor(bmiResult),
            textColor: "#000",
            trailColor: "#d6d6d6",
          })}
        />
        <p>Category: {bmiCategory}</p>
      </div>
    </div>
  );
}
