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
import { logIn } from "../redux/authSlice";
import { useHistory } from "react-router-dom";

const validate = (form) => {
  const errors = {};

  if (form.username.length === 0) {
    errors.username = "Username or email is required";
  }

  if (form.password.length === 0) {
    errors.password = "Password is empty";
  }

  return errors;
};

export const LogIn = () => {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.auth.logged);

  const history = useHistory();

  logged && history.push("/");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      remember: false,
    },
    onSubmit: (values, { setStatus }) => {
      dispatch(logIn(values)).then((res) => {
        setStatus(res.payload.message);
      });
    },
    validate: validate,
  });

  return (
    <Wrapper id="logIn">
      <AuthBox>
        <form onSubmit={formik.handleSubmit} method="POST">
          <InputGroup>
            <Label htmlFor="username">Username or email</Label>
            <InputText
              name="username"
              id="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <ErrorMessage>{formik.errors.username}</ErrorMessage>
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
          <ErrorMessage>{formik.status}</ErrorMessage>
          <ButtonGroup>
            <Primary type="submit">Log In</Primary>
            <LinkBtn to="register">Sign Up</LinkBtn>
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
