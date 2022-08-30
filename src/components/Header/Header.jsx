import React, { useContext } from "react";
import { loginAuthContext } from "../auth/context";

export default function Header() {
  const contextType = useContext(loginAuthContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div>
          <h2 className="navbar-brand">ToDo App Tasks List Header</h2>
          <button onClick={contextType.logoutFunction}>Logout</button>
        </div>
      </nav>
    </>
  );
}
