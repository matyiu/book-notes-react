import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { Book } from "./pages/Book";
import { createGlobalStyle } from "styled-components";
import { darkTheme } from "./variables/colors";
import { LogIn } from "./pages/LogIn";
import Logout from "./pages/Logout";
import { SignUp } from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <GlobalStyle />
        <Switch>
          <Route exact path="/book/:bookId">
            <Book />
          </Route>
          <Route exact path="/login">
            <LogIn />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/register">
            <SignUp />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${darkTheme.background};
    font-family: 'Roboto Condensed', sans-serif;
  }
`;

export default App;
