import React from "react";

import SignupForm from "../components/SignupForm";

const Signup = () => {
  return (
    <div id="sign-up-page">
      <div id="sign-up-card">
        <h2>Welcome to the Chat</h2>
        <SignupForm />
        <br />
        <div className="text-center my-2">Already have an account?</div>
        <a className="signup-link" href="/login">
          Login
        </a>
      </div>
    </div>
  );
};

export default Signup;
