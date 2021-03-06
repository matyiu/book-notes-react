import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Book } from './pages/Book';
import { createGlobalStyle } from 'styled-components';
import { darkTheme } from './variables/colors';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <GlobalStyle />
        <Switch>
          <Route exact path="/book/:bookId">
            <Book />
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
