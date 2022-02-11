import React from "react";

import SignupForm from "../components/SignupForm/SignupForm";

const Signup = () => {
  return (
    <div id="signup-page">
      <div id="signup-card">
        <h2>Sign up to the chat</h2>
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
