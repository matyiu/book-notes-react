import React from "react";
import { AuthBox } from "../layout/AuthBox";
import { useFormik } from "formik";
import {
  Input,
  InputGroup,
  InputText,
  Label,
  ButtonGroup,
  ErrorMessage,
} from "../components/elements/Form";
import { Primary, LinkBtn } from "../components/elements/Button";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/authSlice";
import { useHistory } from "react-router-dom";

const validate = (form) => {
  const errors = {};

  const removeWhitespace = (str) => str.replace(/\s+/g, "");

  if (removeWhitespace(form.username).length === 0) {
    errors.username = "Username is required";
  } else if (/\s+/g.test(form.username)) {
    errors.username = "Whitespaces are not allowed on the username field";
  }

  if (removeWhitespace(form.name).length === 0) {
    errors.name = "Name is required";
  }

  if (removeWhitespace(form.email).length === 0) {
    errors.email = "Email is required";
  }

  if (removeWhitespace(form.password).length === 0) {
    errors.password = "Password is required";
  } else if (form.password.length < 10) {
    errors.password = "The password must be greater than 10";
  }

  if (form.password !== form.confirm_password) {
    errors.confirm_password =
      "The password and the confirmation password do not match";
  }

  return errors;
};

export const SignUp = () => {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.auth.logged);

  const history = useHistory();

  logged && history.push("/");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      name: "",
      confirm_password: "",
      remember: false,
    },
    onSubmit: (values, { setStatus, setErrors }) => {
      dispatch(signUp(values)).then((res) => {
        if (res.payload.success) {
          history.push("/login");
        }

        setErrors(res.payload.errors);
        setStatus(res.payload.message);
      });
    },
    validate: validate,
  });

  return (
    <Wrapper id="signUp">
      <AuthBox>
        <form onSubmit={formik.handleSubmit} method="POST">
          <InputGroup>
            <Label htmlFor="username">Username</Label>
            <InputText
              name="username"
              id="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <ErrorMessage>{formik.errors.username}</ErrorMessage>
          </InputGroup>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <ErrorMessage>{formik.errors.email}</ErrorMessage>
          </InputGroup>
          <InputGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <ErrorMessage>{formik.errors.name}</ErrorMessage>
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <ErrorMessage>{formik.errors.password}</ErrorMessage>
          </InputGroup>
          <InputGroup>
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input
              type="password"
              name="confirm_password"
              id="confirm_password"
              onChange={formik.handleChange}
              value={formik.values.confirm_password}
            />
            <ErrorMessage>{formik.errors.confirm_password}</ErrorMessage>
          </InputGroup>
          <ErrorMessage>{formik.status}</ErrorMessage>
          <ButtonGroup>
            <Primary type="submit">Sign Up</Primary>
            <LinkBtn to="/login">Log In</LinkBtn>
          </ButtonGroup>
        </form>
      </AuthBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;
