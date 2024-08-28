import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import "./tipCalculatorPractice.css";
export default function TipCalculatorPractice() {
  const [calculatedValues, setCalculatedValues] = useState({
    totalTip: 0,
    totalBill: 0,
  });

  const calculateTip = (bill, tipPercentage, tipPerPerson) => {
    const billValue = parseFloat(bill) || 0;
    const tipValue = parseFloat(tipPercentage) || 0;
    const perPersonValue = parseInt(tipPerPerson) || 1;
    const tipAmount = (billValue * tipValue) / 100;
    const total = billValue + tipAmount;

    setCalculatedValues({
      totalTip: tipAmount.toFixed(2),
      totalBill: total.toFixed(2),
      tipPerPerson: (tipAmount / perPersonValue).toFixed(2),
    });
  };
  return (
    <div className="tip-calculator-container">
      <Formik
        initialValues={{ bill: "", tipPerPerson: "1", tipPercentage: "15" }}
        validationSchema={Yup.object({
          bill: Yup.number()
            .min(0, "must be positive")
            .required("required enter input"),
          tipPercentage: Yup.number().min(0, "invalid enter new input"),
          tipPerPerson: Yup.number().min(1, "invalid enter at least 1"),
        })}
        onSubmit={(values) => {
          calculateTip(values.bill, values.tipPercentage, values.tipPerPerson);
          // resetForm();
        }}
        validateOnChange={true}
      >
        {({ getFieldProps, handleSubmit, values, errors }) => (
          <Form onChange={handleSubmit} onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="bill">Bill</label>
              <Field
                type="number"
                id="bill"
                name="bill"
                {...getFieldProps("bill")}
              />
              <ErrorMessage name="bill" component="div" className="error" />
            </div>
            <div className="form-control">
              <label htmlFor="tipPercentage">Tip Percentage</label>
              <Field
                type="number"
                id="tipPercentage"
                name="tipPercentage"
                {...getFieldProps("tipPercentage")}
              />
              <ErrorMessage
                name="tipPercentage"
                component="div"
                className="error"
              />
            </div>
            {values.tipPercentage > 0 && (
              <div className="form-control">
                <label htmlFor="tipPerPerson">Number of People</label>
                <Field
                  type="number"
                  id="tipPerPerson"
                  name="tipPerPerson"
                  {...getFieldProps("tipPerPerson")}
                />
                <ErrorMessage
                  name="tipPerPerson"
                  component="div"
                  className="error"
                />
              </div>
            )}

            <div className="submit-button">
              <button
                disabled={errors.bill || errors.tipPercentage}
                type="submit"
              >
                Calculate
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="results">
        <p>
          <span>Total Tip:</span> <span>${calculatedValues.totalTip}</span>
        </p>
        <p>
          <span>Total Bill:</span> <span>${calculatedValues.totalBill}</span>
        </p>
        <p>
          <span>Tip Per Person:</span>{" "}
          <span>${calculatedValues.tipPerPerson}</span>
        </p>
      </div>
    </div>
  );
}
