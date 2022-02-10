import React, { useState } from "react";
import { useForm } from "react-hook-form";

import FormInput from "./FormInput";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ImageUpload from "./ImageUpload";

const SignupFrom = () => {
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
  const [imageUrl, setImageUrl] = useState();
  const id = uuidv4();

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  const onSubmit = async ({ email, username, password }) => {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("secret", password);

    const avatar = await getFile(imageUrl);
    formData.append("avatar", avatar, avatar.name);

    try {
      await axios.post("https://api.chatengine.io/users", formData, {
        headers: { "private-key": process.env.REACT_APP_CHAT_PRIVATE_KEY },
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
          <ImageUpload id={id} setImageUrl={setImageUrl} imageUrl={imageUrl} />
          <FormInput
            placeholder="Email"
            error={errors.email}
            register={register("email", { required: true })}
          />
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
    </div>
  );
};

export default SignupFrom;
