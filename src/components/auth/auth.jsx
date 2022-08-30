import React, { useContext } from "react";
import { loginAuthContext } from "./context";
import { When } from "react-if";

export default function AuthLogin(props) {
  const loginContext = useContext(loginAuthContext);

  const isLoggedIn = loginContext.loginStatus;
  const userRole = props.capability ? loginContext.authorized(props.actions) : true;
  const allow = isLoggedIn && userRole;

  return (
    <>
      <When condition={allow}>{props.children}</When>
    </>
  );
}
