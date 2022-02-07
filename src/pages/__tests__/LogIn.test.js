import React from "react";
import { LogIn } from "../LogIn";
import { fireEvent, render, screen } from "../../test-utils";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../../redux/authSlice";
import { waitForElementToBeRemoved } from "@testing-library/react";

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

it("Username errors disappear when input is filled", async () => {
  renderAuthStore();

  const { usernameField, submitButton } = getLogInFields();

  fireEvent.click(submitButton, { name: "Log In" });
  expect(await screen.findByText("Username or email is required")).toBeTruthy();

  changeFieldValue(usernameField, "user");
  fireEvent.click(submitButton, { name: "Log In" });
  await waitForElementToBeRemoved(() =>
    screen.queryByText("Username or email is required")
  );
  expect(screen.queryByText("Username or email is required")).toBeNull();
});

it("Username errors disappear when input is filled", async () => {
  renderAuthStore();

  const { passwordField, submitButton } = getLogInFields();

  fireEvent.click(submitButton, { name: "Log In" });
  expect(await screen.findByText("Password is empty")).toBeTruthy();

  changeFieldValue(passwordField, "newpassword");
  fireEvent.click(submitButton, { name: "Log In" });
  await waitForElementToBeRemoved(() =>
    screen.queryByText("Password is empty")
  );
  expect(screen.queryByText("Password is empty")).toBeNull();
});

describe("Fetch Calls", () => {
  const fetchResponses = {
    authError: {
      body: {
        success: false,
        message: "Username or password is incorrect",
      },
      options: {
        status: 400,
      },
    },
    validationError: {
      body: {
        message: "The given data was invalid.",
        errors: {
          username: ["The username field is required."],
          password: ["The password field is required."],
        },
      },
      options: {
        status: 422,
      },
    },
  };

  beforeEach(() => {
    fetch.resetMocks();
  });

  it("Show user authentication error", async () => {
    fetch.mockResponse(
      JSON.stringify(fetchResponses.authError.body),
      fetchResponses.authError.options
    );

    renderAuthStore();

    const { usernameField, passwordField, submitButton } = getLogInFields();
    changeFieldValue(usernameField, "user");
    changeFieldValue(passwordField, "userpassword");

    fireEvent.click(submitButton, { name: "Log In" });
    expect(
      await screen.findByText(fetchResponses.authError.body.message)
    ).toBeTruthy();
  });

  it("Show user back end invalid data error", async () => {
    const validationError = fetchResponses.validationError;
    fetch.mockResponse(
      JSON.stringify(validationError.body),
      validationError.options
    );

    renderAuthStore();

    const { usernameField, passwordField, submitButton } = getLogInFields();
    changeFieldValue(usernameField, "user");
    changeFieldValue(passwordField, "userpassword");

    fireEvent.click(submitButton, { name: "Log In" });
    expect(await screen.findByText(validationError.body.message)).toBeTruthy();
  });

  const errors = fetchResponses.validationError.body.errors;
  it.each([...errors.username, ...errors.password])(
    "Show field validation error: %s",
    async (msg) => {
      const validationError = fetchResponses.validationError;
      fetch.mockResponse(
        JSON.stringify(validationError.body),
        validationError.options
      );

      renderAuthStore();

      const { usernameField, passwordField, submitButton } = getLogInFields();
      changeFieldValue(usernameField, "user");
      changeFieldValue(passwordField, "userpassword");

      fireEvent.click(submitButton, { name: "Log In" });
      expect(await screen.findByText(msg)).toBeTruthy();
    }
  );

  it("Handles request could not be sent", async () => {
    fetch.mockReject(
      (req) =>
        req === "http://boonote.test:8000/login" &&
        Promise.reject(new TypeError("Failed to fetch"))
    );

    renderAuthStore();

    const { usernameField, passwordField, submitButton } = getLogInFields();
    changeFieldValue(usernameField, "user");
    changeFieldValue(passwordField, "userpassword");

    fireEvent.click(submitButton, { name: "Log In" });
    expect(
      await screen.findByText(
        "Connection error: please check your internet connection and/or try again"
      )
    ).toBeTruthy();
  });
});
