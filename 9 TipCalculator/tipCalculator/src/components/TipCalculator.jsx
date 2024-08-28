import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "./tipCalculator.css";

export default function TipCalculator() {
  const [totalAmount, setTotalAmount] = useState({
    billAmount: 0,
    tipPercentage: 15,
    perPerson: 1,
    totalBill: 0,
    totalTipAmount: 0,
    totalPerPerson: 0,
  });

  const calculateTip = (bill, tip, perPerson) => {
    const billValue = parseFloat(bill) || 0;
    const tipValue = parseFloat(tip) || 0;
    const perPersonValue = parseInt(perPerson) || 1;
    const tipAmount = (billValue * tipValue) / 100;
    const total = billValue + tipAmount;

    setTotalAmount({
      billAmount: billValue,
      tipPercentage: tipValue,
      perPerson: perPersonValue,
      totalBill: total,
      totalTipAmount: tipAmount,
      totalPerPerson: total / perPersonValue,
    });
  };

  return (
    <div className="tip-calculator-container">
      <h2>Tip Calculator</h2>
      <Formik
        initialValues={{
          bill: "",
          tipPercentage: "15",
          perPerson: "1",
        }}
        validationSchema={Yup.object({
          bill: Yup.number()
            .min(0, "Bill must be positive")
            .required("Enter bill amount"),
          tipPercentage: Yup.number()
            .min(0, "Tip must be positive")
            .required("Enter tip percentage"),
          perPerson: Yup.number()
            .min(1, "Number of people must be at least 1")
            .required("Enter number of people"),
        })}
        onSubmit={(values) => {
          calculateTip(values.bill, values.tipPercentage, values.perPerson);
        }}
      >
        {({ setFieldTouched, handleSubmit, getFieldProps }) => (
          <Form onChange={handleSubmit}>
            <div className="form-group">
              <label htmlFor="bill">Bill Amount:</label>
              <Field
                name="bill"
                id="bill"
                type="number"
                onFocus={() => setFieldTouched("bill", false)}
                {...getFieldProps("bill")}
              />
              <ErrorMessage name="bill" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="tipPercentage">Tip Percentage:</label>
              <Field
                name="tipPercentage"
                id="tipPercentage"
                type="number"
                onFocus={() => setFieldTouched("tipPercentage", false)}
                {...getFieldProps("tipPercentage")}
              />
              <ErrorMessage
                name="tipPercentage"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="perPerson">Number of People:</label>
              <Field
                name="perPerson"
                id="perPerson"
                type="number"
                onFocus={() => setFieldTouched("perPerson", false)}
                {...getFieldProps("perPerson")}
              />
              <ErrorMessage
                name="perPerson"
                component="div"
                className="error"
              />
            </div>
          </Form>
        )}
      </Formik>
      <div className="display-bill-container">
        <h3>Summary:</h3>
        <p>Bill Amount: ${totalAmount.billAmount.toFixed(2)}</p>
        <p>Tip Percentage: {totalAmount.tipPercentage}%</p>
        <p>Tip Amount: ${totalAmount.totalTipAmount.toFixed(2)}</p>
        <p>Number of People: {totalAmount.perPerson}</p>
        <p>Tip per Person: ${totalAmount.totalPerPerson.toFixed(2)}</p>
        <p>Total Amount: ${totalAmount.totalBill.toFixed(2)}</p>
      </div>
    </div>
  );
}
