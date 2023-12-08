import React from "react";
import "../assets/css/ChangePassword.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { useFormik } from "formik";
import { LoginSchema } from "../features/validations/UserSchema";

const url = "http://localhost:4000";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id_change } = useParams();

  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);

    const credentials = {
      currentPassword: values.currentPassword,
      newPassword: values.password
    };
    console.log(credentials);

    fetch(`${url}/users/update/${id_change}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("PUT request successful:", data);
        window.location.replace("/");
      })
      .catch((error, req) => {
        console.error("Error making POST request:", error, req);
      });
    // actions.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: ""
    },
    onSubmit
  });

  return (
    <div className="changepassword-container">
      <div className="changepassword">
        <h3>LOGIN</h3>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <label for="currentPassword">Current password *</label>
          <input
            type="password"
            name="currentPassword"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label for="password">New password *</label>
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
          <button type="submit">CHANGE PASSWORD</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
