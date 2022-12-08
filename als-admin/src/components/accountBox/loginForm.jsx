import React from "react";
import {
  BoxContainer,
  FieldContainer,
  FieldError,
  FormContainer,
  Input,
  SubmitButton,
} from "./common";
import Marginer from "../marginer";
import { useFormik } from "formik";
import { loginAuthAsync } from "../../services/userServices";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup.string().email("Email is invalid").required("Please input email"),
  password: yup.string().required("Please input password"),
});

export function LoginForm(props) {
  const {auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  const from = "/";

  const onSubmit = async (values) => {
    //console.log(values);
    const response = await loginAuthAsync(values);
    // const email = response.data.email;
    // console.log(email);
    // const role = response.data.role;
    // console.log(role);
    // const uid = response.data.userId;
    // console.log(uid);
    setAuth(response.data);
    // console.log(auth);
    // console.log(from);
    navigate(from, { replace: true });
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <BoxContainer>
      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""}
          </FieldError>
        </FieldContainer>
        <Marginer direction="vertical" margin="0.3em" />
        <FieldContainer>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""}
          </FieldError>
        </FieldContainer>
        <Marginer direction="vertical" margin="2.5em" />
        <SubmitButton type="submit" disabled={!formik.isValid}>
          Login
        </SubmitButton>
      </FormContainer>
    </BoxContainer>
  );
}
