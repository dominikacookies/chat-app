import React from "react";

import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to the Chat</h2>
        <LoginForm />
        <br />
        <div className="text-center my-2">Don't have an account?</div>
        <a className="signup-link" href="/signup">
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default Login;
