import React from "react";
import { SignUp } from "../SignUp";
import { changeFieldValue, fireEvent, render, screen } from "../../test-utils";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../../redux/authSlice";
import { waitForElementToBeRemoved } from "@testing-library/react";

const renderAuthStore = () => {
  return render(<SignUp />, {
    store: configureStore({ reducer: { auth: authSlice } }),
  });
};

const getFields = () => {
  const usernameField = screen.getByLabelText("Username");
  const emailField = screen.getByLabelText("Email");
  const nameField = screen.getByLabelText("Name");
  const passwordField = screen.getByLabelText("Password");
  const confirmPasswordField = screen.getByLabelText("Confirm Password");
  const submitButton = screen.getByRole("button");

  return {
    usernameField,
    emailField,
    nameField,
    passwordField,
    confirmPasswordField,
    submitButton,
  };
};

describe("Front End Validation", () => {
  it("Displays username error when the field is empty", async () => {
    renderAuthStore();

    const { usernameField, submitButton } = getFields();
    fireEvent.click(submitButton, { name: "Sign Up" });
    expect(await screen.findByText("Username is required")).toBeTruthy();

    changeFieldValue(usernameField, "         ");
    fireEvent.click(submitButton, { name: "Sign Up" });
    expect(await screen.findByText("Username is required")).toBeTruthy();
  });

  it("Displays username error when the field has whitespaces", async () => {
    renderAuthStore();

    const { usernameField, submitButton } = getFields();
    changeFieldValue(usernameField, "user with spaces");
    fireEvent.click(submitButton, { name: "Sign Up" });
    expect(
      await screen.findByText(
        "Whitespaces are not allowed on the username field"
      )
    ).toBeTruthy();
  });
});
