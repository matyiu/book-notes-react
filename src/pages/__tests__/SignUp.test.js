import React from "react";
import { SignUp } from "../SignUp";
import { changeFieldValue, fireEvent, render, screen } from "../../test-utils";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../../redux/authSlice";

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

const testFieldFrontValidation = async (field, value, msg) => {
  const { submitButton } = getFields();
  changeFieldValue(field, value);
  fireEvent.click(submitButton, { name: "Sign Up" });
  expect(await screen.findByText(msg)).toBeTruthy();
};

describe("Front End Validation", () => {
  beforeEach(() => {
    renderAuthStore();
  });

  it("Displays username error when the field is empty", async () => {
    const { usernameField } = getFields();

    await testFieldFrontValidation(usernameField, "", "Username is required");

    await testFieldFrontValidation(
      usernameField,
      "    ",
      "Username is required"
    );
  });

  it("Displays username error when the field has whitespaces", async () => {
    const { usernameField } = getFields();

    await testFieldFrontValidation(
      usernameField,
      "user with spaces",
      "Whitespaces are not allowed on the username field"
    );
  });

  it("Displays name errors when field is empty", async () => {
    const { nameField } = getFields();

    await testFieldFrontValidation(nameField, "", "Name is required");

    await testFieldFrontValidation(nameField, "    ", "Name is required");
  });

  it("Displays email errors when field is empty", async () => {
    const { emailField } = getFields();

    await testFieldFrontValidation(emailField, "", "Email is required");

    await testFieldFrontValidation(emailField, "    ", "Email is required");
  });

  it("Displays password errors when field is empty", async () => {
    const { passwordField } = getFields();

    await testFieldFrontValidation(passwordField, "", "Password is required");

    await testFieldFrontValidation(
      passwordField,
      "    ",
      "Password is required"
    );
  });

  it("Displays password errors when value is less than 10 characters", async () => {
    const { passwordField } = getFields();

    await testFieldFrontValidation(
      passwordField,
      "123",
      "The password must be greater than 10"
    );
  });

  it("Displays password errors when confirm password and password fields aren't equal", async () => {
    const { passwordField, confirmPasswordField } = getFields();

    changeFieldValue(passwordField, "1234567890");

    await testFieldFrontValidation(
      confirmPasswordField,
      "1234567890 not equal",
      "The password and the confirmation password do not match"
    );
  });
});

const validationErrors = {
  password: [
    "The password is required.",
    "The password must be at least 10 characters.",
  ],
  confirm_password: ["The confirm password and password must match."],
  name: ["The name is required."],
  email: ["The email is required.", "The email has already been taken."],
  username: [
    "The username is required.",
    "The username has already been taken.",
  ],
};

describe("Back end validation", () => {
  beforeEach(() => {
    renderAuthStore();

    const fields = getFields();
    changeFieldValue(fields.usernameField, "jeff");
    changeFieldValue(fields.emailField, "jeff@domain.com");
    changeFieldValue(fields.nameField, "Jeff");
    changeFieldValue(fields.passwordField, "1234567890");
    changeFieldValue(fields.confirmPasswordField, "1234567890");
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  it.each([
    ...validationErrors.password,
    ...validationErrors.confirm_password,
    ...validationErrors.name,
    ...validationErrors.username,
    ...validationErrors.email,
  ])("Show field validation error: %s", async (msg) => {
    fetch.mockResponse(
      JSON.stringify({
        message: "Invalid data",
        errors: validationErrors,
      }),
      {
        status: 422,
      }
    );

    const { submitButton } = getFields();
    fireEvent.click(submitButton, { name: "Sign Up" });

    expect(await screen.findByText(new RegExp(msg))).toBeTruthy();
  });

  it("Handles server error message", async () => {
    fetch.mockResponse(
      JSON.stringify({
        message: "Server error",
      }),
      {
        status: 500,
      }
    );

    const { submitButton } = getFields();
    fireEvent.click(submitButton, { name: "Sign Up" });

    expect(await screen.findByText("Server error")).toBeTruthy;
  });

  it("Handles fetch connection error message", async () => {
    fetch.mockReject(
      (req) =>
        req === "http://boonote.test:8000/register" &&
        Promise.reject(new TypeError("Failed to fetch"))
    );

    const { submitButton } = getFields();
    fireEvent.click(submitButton, { name: "Sign Up" });

    expect(await screen.findByText("Connection error")).toBeTruthy;
  });
});
