import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form } from "formik";
import './signup.css'

export default function Signup() {
  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password:"",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form class="formrp">
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="Jane" />

          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" />

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="jane@acme.com"
            type="email"
          />
          <label type="password">password</label>
          <Field type="password"
          name="password" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
