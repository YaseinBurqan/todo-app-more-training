import React, { useState, useEffect } from "react";
import cookie from "react-cookies";
import jwt from "jwt-decode";
import axios from "axios";
import base64 from "base-64";
import superagent from "superagent";

export const loginAuthContext = React.createContext();

const API = `https://hiservice.herokuapp.com`;

export default function LoginProvider(props) {
  const [user, setUser] = useState({
    username: cookie.load("username") || "",
    actions: cookie.load("actions") || [],
  });

  const [username, setUsername] = useState({});
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const tokenFromCookies = cookie.load("token");
    if (tokenFromCookies) {
      setLoginStatus(true);
      setUser(user);
    } else {
      setLoginStatus(false);
      setUser({});
    }
  }, []);

  const loginFunction = async (username, password) => {
    let data;
    try {
      const response = await superagent
        .post(`${API}/users/login`)
        .set("authorization", `Basic ${base64.encode(`${username}:${password}`)}`)
        .then((res) => {
          data = res.body;
        });

      console.log("User Body => ", data);
      validateToken(data);
    } catch (err) {
      console.log(err);
    }
  };

  const logoutFunction = () => {
    setLoginStatus(false);
    setUser({});

    cookie.remove("token");
    cookie.remove("actions");
    cookie.remove("username");
    cookie.remove("dataUser");
  };

  // const signUpFunction = (username, password, role) => {
  //   let data;
  //   try {
  //     axios
  //       .post(`${API}/users/signup`, {
  //         username: username,
  //         password: password,
  //         role: role,
  //       })
  //       .then((res) => {
  //         data = res.body;
  //       });
  //     console.log("User Body => ", data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleUsernameFromToken = (e) => {
    e.preventDefault();
    setUsername(username);
  };

  const validateToken = (data) => {
    if (data) {
      const valid = jwt(data.token);
      if (valid) {
        setLoginStatus(true);
        setUser(data);
        cookie.save("userData", data);
        cookie.save("token", user.token);
        cookie.save("username", data.username);
        cookie.save("actions", data.actions);
        console.log("actions", data.actions);
      } else {
        setLoginStatus(false);
        setUser({});
      }
    } else {
      setLoginStatus(false);
      setUser({});
    }
  };

  const authorized = (action) => {
    return user?.actions?.includes(action);
  };

  // useEffect(() => {
  //   const data = cookie.load("dataUser");
  //   if (data) {
  //     validateToken(data);
  //   }
  // }, []);

  const state = {
    user: user,
    authorized: authorized,
    loginStatus: loginStatus,
    loginFunction: loginFunction,
    logoutFunction: logoutFunction,
    // signUpFunction: signUpFunction,
    username: handleUsernameFromToken,
    error: null,
  };

  return (
    <>
      <loginAuthContext.Provider value={state}>{props.children}</loginAuthContext.Provider>
    </>
  );
}
