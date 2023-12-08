import React from "react";
import Login from "./Login";
import Register from "./Register";
import "../assets/css/Account.scss";

const Account = () => {
  return (
    <div className="account-container">
      <div className="account">
        <Login />
        <Register />
      </div>
    </div>
  );
};

export default Account;
