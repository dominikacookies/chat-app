import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import firebase from "firebase/app";

import { auth } from "../firebase";

const LoginForm = () => {
  return (
    <div
      className="login-button google"
      onClick={() =>
        auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      }
    >
      <GoogleOutlined /> Sign in with Google
    </div>
  );
};

export default LoginForm;
