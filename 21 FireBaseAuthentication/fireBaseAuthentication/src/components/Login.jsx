import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUsingEmailAndPassword } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
export default function Login() {
  const navigate = useNavigate();
  const [loading] = useAuthState(auth);
  const [loginError, setLoginError] = useState("");

  const { handleSubmit, getFieldProps, touched, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await loginUsingEmailAndPassword(values.email, values.password);
        navigate("/todo");
      } catch (error) {
        console.error("Login failed", error);
        setLoginError("Invalid email or password. Please try again.");
      }
    },
  });
  if (loading) return <div>Loading... login</div>;
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="email">Enter Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="inputField"
          {...getFieldProps("email")}
        />
        {touched.email && errors.email && (
          <div className="error">{errors.email}</div>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="inputField"
          id="password"
          name="password"
          {...getFieldProps("password")}
        />
        {touched.password && errors.password && (
          <div className="error">{errors.password}</div>
        )}
        {loginError && (
          <div className="error" style={{ color: "red", marginTop: "10px" }}>
            {loginError}
          </div>
        )}
        <button className="button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
