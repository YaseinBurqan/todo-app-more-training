import "./SignUpLoginLogout.scss";
import React, { useContext, useState } from "react";

import { When } from "react-if";
import { loginAuthContext } from "./context";
import Header from "../Header/Header";

import ToDo from "../Todo/Todo";
import Auth from "./auth";

export default function LoginForm() {
  const contextType = useContext(loginAuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const state = {
    username: username,
    password: password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    contextType.loginFunction(state.username, state.password);
  };

  return (
    <>
      <When condition={contextType.loginStatus}>
        <div>
          <Header />
          {state.username}
        </div>
        <ToDo />
      </When>

      <When condition={!contextType.loginStatus}>
        <form className="card-border-login" onSubmit={handleSubmit}>
          <h3 className="CardHeader">Sign In</h3>
          <div className="mb-3">
            <label className="inputValues">Username</label>
            <input type="text" className="form-control" placeholder="Enter username" onChange={handleChangeUsername} />
          </div>
          <div className="mb-3">
            <label className="inputValues">Password</label>
            <input type="password" className="form-control" placeholder="Enter password" onChange={handleChangePassword} />
          </div>
          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Signin
            </button>
          </div>
          <p className="forgot-password text-right">
            <button>Forgot password?</button>
          </p>
          <p></p>
        </form>
      </When>
    </>
  );
}
