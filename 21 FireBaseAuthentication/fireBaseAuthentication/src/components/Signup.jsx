import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./signup.css";
import { registerWithEmailAndPassword } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
export default function Signup() {
  const [loading] = useAuthState(auth);
  const navigate = useNavigate();
  const { getFieldProps, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Minimum of 3 characters required")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await handleRegister(values.username, values.email, values.password);
        navigate("/todo");
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
  });

  const handleRegister = async (name, email, password) => {
    try {
      await registerWithEmailAndPassword(name, email, password);
      navigate("/todo");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <div>Loading... signup</div>;

  return (
    <div className="signupContainer">
      <form onSubmit={handleSubmit} className="signupForm">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          className="inputField"
          {...getFieldProps("username")}
        />
        {touched.username && errors.username && (
          <div className="error">{errors.username}</div>
        )}
        <label htmlFor="email">Email</label>
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
        <button type="submit" className="submitButton">
          Sign Up
        </button>
      </form>
    </div>
  );
}
