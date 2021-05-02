import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form } from "formik";
import "./signup.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { signupapi } from "./auth";

const validate = (values, props /* only available when using withFormik */) => {
  const errors = {};
  console.log(values);
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 5) {
    errors.password = "Password should be atleast of 5 characters";
  }
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }

  //...
  console.log(errors);
  return errors;
};

export default function Signup({setappState}) {
  const [sucsess, setSucsess] = useState(false);
  const handleSubmit = (values,{setErrors}) => {
    const result = signupapi(values);
    if (result.sucsess) {
      setSucsess(true);
    }
    else {
        setErrors({email:result.error})
    }
  };
  return (
    <>
      {sucsess && (
        <div class="mainpage">
          <h2>Registration sucsessfull</h2>
          <Button
            onClick={() => setappState("Signin")}
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        </div>
      )}
      {!sucsess && (
        <div>
          <div class="signrp">
            <h1>Sign Up</h1>
          </div>
          <div>
            <Formik
              validate={validate}
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
              }}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, handleChange }) => (
                <Form class="formrp">
                  <TextField
                    error={errors.firstName && touched.firstName}
                    name="firstName"
                    id="outlined-error-helper-text"
                    label="First Name"
                    helperText={errors.firstName}
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <TextField
                    error={errors.lastName && touched.lastName}
                    name="lastName"
                    id="outlined-error-helper-text"
                    label="Last Name"
                    helperText={errors.lastName}
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <TextField
                    error={errors.email && touched.email}
                    name="email"
                    id="outlined-error-helper-text"
                    label="E-mail"
                    helperText={errors.email}
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <TextField
                    error={errors.password && touched.password}
                    name="password"
                    type="password"
                    id="outlined-error-helper-text"
                    label="Password"
                    helperText={errors.password}
                    variant="outlined"
                    onChange={handleChange}
                  />

                  <Button type="submit" variant="contained" color="primary">
                    Sign Up
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}
