import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import "./signup.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { deleteuserapi, signinapi } from "./auth";

const validate = (values, props /* only available when using withFormik */) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

export default function Signin({ setappState }) {
  const [sucsess, setSucsess] = useState(false);
  const [user, setUser] = useState(false);
  const handleSubmit = (values, { setErrors }) => {
    const result = signinapi(values);
    if (result.sucsess) {
      setSucsess(true);
      setUser(result.data);
    } else {
      setErrors({ password: result.error });
    }
  };
  return (
    <>
      {sucsess && (
        <div class="mainpage">
          <h2>Welcome</h2>
          <div>Four Name = {user.firstName}</div>
          <div>Last Name = {user.lastName}</div>
          <div>E-mail = {user.email}</div>
          <Button
            onClick={() => setappState(null)}
            variant="contained"
            color="primary"
          >
            Sign Out
          </Button>
          <Button
            onClick={() => {
              deleteuserapi(user.email);
              setappState(null);
            }}
            variant="contained"
            color="primary"
          >
            Delete
          </Button>
        </div>
      )}
      {!sucsess && (
        <div>
          <div class="signrp">
            <h1>Sign In</h1>
          </div>
          <div>
            <Formik
              validate={validate}
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, handleChange }) => (
                <Form class="formrp">
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
                    id="outlined-error-helper-text"
                    label="Password"
                    helperText={errors.password}
                    variant="outlined"
                    onChange={handleChange}
                  />

                  <Button type="submit" variant="contained" color="primary">
                    Sign In
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
