import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../app/cookies";

const initialState = {
  user: {},
  logged: sessionStorage.getItem("logged") === "true" || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      if (action.payload.success === true) {
        state.user = action.payload.data;
        state.logged = true;
        sessionStorage.setItem("logged", "true");
      }
    });
  },
});

export const logIn = createAsyncThunk("login", async (userData = {}) => {
  await fetch("http://boonote.test:8000/sanctum/csrf-cookie", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const res = await fetch("http://boonote.test:8000/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": decodeURIComponent(getCookie("XSRF-TOKEN")),
      "X-Requested-With": "XMLHttpRequest",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });
  const json = await res.json();

  return json;
});

export default authSlice.reducer;
