import React from "react";
import { GoogleOutlined } from "@ant-design/icons";
import firebase from "firebase/app";

import { auth } from "../firebase";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to the Chat</h2>
        <LoginForm />
        <br /> <br />
      </div>
    </div>
  );
};

export default Login;
