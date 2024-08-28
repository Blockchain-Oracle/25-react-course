import "./progressloadingBarPractice.css";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ProgressloadingBarPractice() {
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const { handleSubmit, errors, getFieldProps } = useFormik({
    initialValues: {
      loadingPercentage: "0",
    },
    validationSchema: Yup.object({
      loadingPercentage: Yup.number()
        .min(0, "minmum is zero")
        .max(100, "max is 100"),
    }),
    onSubmit: (values) => {
      values.loadingPercentage > 100
        ? (values.loadingPercentage = 100)
        : values.loadingPercentage;
      values.loadingPercentage < 0
        ? (values.loadingPercentage = 0)
        : values.loadingPercentage;
      setLoadingPercentage(values.loadingPercentage);
    },
  });
  return (
    <div className="progress-loadingBarPractice-container">
      {errors.loadingPercentage ? (
        <div className="error-message-container">
          <p>{errors.loadingPercentage}</p>
        </div>
      ) : (
        <div className="progress-bar-container">
          <div className="wrapper">
            <div
              className="innerWrapper"
              style={{ width: `${loadingPercentage}%` }}
            >
              {loadingPercentage}
            </div>
          </div>
        </div>
      )}

      <div className="input-container">
        <form onChange={handleSubmit} onSubmit={handleSubmit}>
          <label htmlFor="loadingPercentage">Perentage :</label>
          <input
            type="number"
            id="loadingPercentage"
            name="loadingPercentage"
            min={0}
            max={100}
            {...getFieldProps("loadingPercentage")}
          />
        </form>
      </div>
    </div>
  );
}
