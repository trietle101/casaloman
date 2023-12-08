import React from "react";
import "../assets/css/Login.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { useFormik } from "formik";
import { LoginSchema } from "../features/validations/UserSchema";

const url = "http://localhost:4000";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);

    const credentials = {
      email: values.email,
      password: values.password
    };
    console.log(credentials);

    fetch(`${url}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("PUT request successful:", data);
        dispatch(
          loginSuccess({
            user: data.userInfo,
            token: data.token,
            expiresIn: data.expiresIn
          })
        );
        localStorage.setItem("user", data.userInfo.name);
        localStorage.setItem("userId", data.userInfo.id);
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAuthenticated", true);
        window.location.replace("/");
      })
      .catch((error, req) => {
        console.error("Error making POST request:", error, req.body);
      });
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: LoginSchema,
    onSubmit
  });

  return (
    <div className="login-container">
      <div className="login">
        <h3>LOGIN</h3>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <label for="username">Username or email address *</label>
          <input
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.errors.email && formik.touched.email ? "input-error" : ""
            }
          />
          {formik.errors.email && formik.touched.email && (
            <p className="error">{formik.errors.email}</p>
          )}
          <label for="password">Password *</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.errors.password && formik.touched.password
                ? "input-error"
                : ""
            }
          />
          {formik.errors.password && formik.touched.password && (
            <p className="error">{formik.errors.password}</p>
          )}
          <input type="checkbox" />
          <span>Remember me</span>
          <button type="submit">LOG IN</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
