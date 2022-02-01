import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchWrapper from "../app/fetchWrapper";

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

    builder.addCase(logout.fulfilled, (state, action) => {
      if (action.payload.success !== false) {
        state.user = {};
        state.logged = false;
        sessionStorage.setItem("logged", "false");
      }
    });
  },
});

export const logIn = createAsyncThunk("login", async (userData = {}) => {
  await fetchWrapper.get("http://boonote.test:8000/sanctum/csrf-cookie");

  const res = await fetchWrapper.post("http://boonote.test:8000/login", {
    body: JSON.stringify(userData),
  });

  return await res.json();
});

export const logout = createAsyncThunk("logout", async () => {
  const res = await fetchWrapper.delete("http://boonote.test:8000/logout");
  return await res.json();
});

export const signUp = createAsyncThunk("signup", async (userData = {}) => {
  const res = await fetchWrapper.post("http://boonote.test:8000/register", {
    body: JSON.stringify(userData),
  });

  return await res.json();
});

export default authSlice.reducer;
