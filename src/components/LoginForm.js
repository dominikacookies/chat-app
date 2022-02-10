import React, { useState } from "react";
import { GoogleOutlined } from "@ant-design/icons";
import firebase from "firebase/app";
import { useForm } from "react-hook-form";

import { auth } from "../firebase";
import FormInput from "./FormInput";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const [error, setError] = useState(null);
  const history = useHistory();
  const { setUser } = useAuth();

  const onSubmit = async ({ username, password }) => {
    console.log("helo");
    try {
      await axios.get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": process.env.REACT_APP_PROJECT_CHAT_ID,
          "user-name": username,
          "user-secret": password,
        },
      });

      setUser({
        displayName: username,
        uid: password,
      });

      history.push("/chats");
    } catch (error) {
      setError("User does not exist");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <FormInput
            placeholder="Username"
            error={errors.username}
            register={register("username", { required: true })}
          />
          <FormInput
            placeholder="Password"
            error={errors.password}
            type="password"
            register={register("password", { required: true })}
          />
        </section>
        <div className="button-block py-3">
          <button type="submit">Login</button>
        </div>
      </form>
      <div
        className="login-button google"
        onClick={() =>
          auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
        }
      >
        <GoogleOutlined /> Sign in with Google
      </div>
    </div>
  );
};

export default LoginForm;
