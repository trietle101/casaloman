import * as yup from "yup";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const UserSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("This field is required"),
  name: yup.string().required("This field is required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRegex, {
      message:
        "Please enter password with more than 5 characters, 1 upper case letter, 1 lower case letter and 1 numeric digit."
    })
    .required("This field is required")
});
export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("This field is required"),
  password: yup.string().required("This field is required")
});
