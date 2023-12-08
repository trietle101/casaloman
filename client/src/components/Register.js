import React from "react";
import "../assets/css/Register.scss";
import { useFormik } from "formik";
import { UserSchema } from "../features/validations/UserSchema";

const url = "http://localhost:4000";

const onSubmit = async (values, actions) => {
  console.log(values);
  console.log(actions);

  const newUser = {
    name: values.name,
    email: values.email,
    password: values.password,
    date: new Date().toLocaleDateString("fr-CA"),
    role: "1"
  };
  console.log(newUser);
  fetch(`${url}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  })
    .then((data) => {
      console.log("PUT request successful:", data);
    })
    .catch((error) => {
      console.error("Error making PUT request:", error);
    });
  actions.resetForm();
};

const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema: UserSchema,
    onSubmit
  });

  return (
    <div className="register-container">
      <div className="register">
        <h3>REGISTER</h3>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <label for="name">Fullname *</label>
          <input
            type="text"
            name="name"
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.errors.name && formik.touched.name ? "input-error" : ""
            }
          />
          {formik.errors.name && formik.touched.name && (
            <p className="error">{formik.errors.email}</p>
          )}
          <label for="email">Email address *</label>
          <input
            type="text"
            name="email"
            required
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
            required
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
          <button type="submit">REGISTER</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
