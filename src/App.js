import "./App.css";
import React, { useState } from "react";
import ToDo from "./components/Todo/Todo";
import Header from "./components/Header/Header";

import LoginProvider from "./components/auth/context";
import Login from "./components/auth/SignUpLoginLogout";
import Auth from "./components/auth/auth.jsx";

import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./Theme/Theme";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

function App() {
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <>
      <div className="App">
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <GlobalStyles />
          <StyledApp>
            <LoginProvider>
              <button className="-control" type="submit" onClick={() => themeToggler()}>
                Change Theme
              </button>
              <Login />
            </LoginProvider>
          </StyledApp>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
