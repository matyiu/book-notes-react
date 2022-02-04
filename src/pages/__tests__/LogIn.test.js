import React from "react";
import { LogIn } from "../LogIn";
import { fireEvent, render, screen } from "../../test-utils";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../../redux/authSlice";

const renderAuthStore = () => {
  return render(<LogIn />, {
    store: configureStore({ reducer: { auth: authSlice } }),
  });
};

const getLogInFields = () => {
  const usernameField = screen.getByLabelText("Username or email");
  const passwordField = screen.getByLabelText("Password");
  const submitButton = screen.getByRole("button");

  return {
    usernameField,
    passwordField,
    submitButton,
  };
};

const changeFieldValue = (field, value) => {
  fireEvent.change(field, {
    target: {
      value,
    },
  });
};

it("Form doesn't submit with empty inputs", async () => {
  renderAuthStore();
  const { submitButton } = getLogInFields();

  fireEvent.click(submitButton, { name: "Log In" });
  expect(await screen.findByText("Username or email is required")).toBeTruthy();
  expect(await screen.findByText("Password is empty")).toBeTruthy();
});

it("Form doesn't submit with blank input values", async () => {
  renderAuthStore();

  const { usernameField, passwordField, submitButton } = getLogInFields();

  changeFieldValue(usernameField, "     ");
  changeFieldValue(passwordField, "     ");

  fireEvent.click(submitButton, { name: "Log In" });
  expect(await screen.findByText("Username or email is required")).toBeTruthy();
  expect(await screen.findByText("Password is empty")).toBeTruthy();
});
