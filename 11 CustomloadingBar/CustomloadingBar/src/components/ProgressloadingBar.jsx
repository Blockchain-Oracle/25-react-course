import "./progressloadingBar.css";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ProgressloadingBar() {
  const [progressPercent, setProgressPercent] = useState(0);

  const { errors, getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      progressPercent: "0",
    },
    validationSchema: Yup.object({
      progressPercent: Yup.number()
        .min(0, "min is zero")
        .max(100, "max is 100")
        .required("value is required"),
    }),
    onSubmit: (values) => {
      setProgressPercent(values.progressPercent);
    },
    validateOnChange: true,
  });

  return (
    <div className="progressloadingBar-container">
      <h1>Custom Progress Bar</h1>

      <div className="progress-bar">
        <div className="wrapper">
          {!errors.progressPercent ? (
            <div
              className="inner-wrapper"
              style={{ width: `${progressPercent}%` }}
            >
              {progressPercent}
            </div>
          ) : (
            <div className="error-message-container">
              <p>{errors.progressPercent}</p>
            </div>
          )}
        </div>
      </div>

      <div className="input-container">
        <form onChange={handleSubmit}>
          <label htmlFor="progressPercent">Percentage : </label>
          <input
            name="progressPercent"
            id="progressPercent"
            type="number"
            {...getFieldProps("progressPercent")}
            min={0}
          />
        </form>
      </div>
    </div>
  );
}
