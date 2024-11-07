import React from "react";
import { useSelector } from "react-redux";
import Login from "./Login";

const Account = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return isLoggedIn ? <p>Wilkommen</p> : <Login />;
};

export default Account;
