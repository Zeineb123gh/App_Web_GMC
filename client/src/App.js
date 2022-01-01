// @ts-nocheck
import React, { Component } from "react";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme/index";
import { Alert } from "./components";

import Routes from "./Routes";

import "./assets/scss/index.scss";
import "typeface-montserrat";
import { CssBaseline } from "@material-ui/core";

function App() {
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Alert />
        <Routes />
        <div className="cursor" id="cursor" />
        <div className="cursor2" id="cursor2" />
        <div className="cursor3" id="cursor3" />
      </ThemeProvider>
    </div>
  );
}

export default App;
