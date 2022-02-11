import React, { useState } from "react";
import { useForm } from "react-hook-form";

import FormInput from "../FormInput";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import ImageUpload from "../ImageUpload/ImageUpload";
import {
  generateSignUpFormData,
  createNewUserRequest,
} from "../../utils/userCreationUtils";

import "./signupForm.css";

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

  const onSubmit = async ({ email, username, password }) => {
    const formData = await generateSignUpFormData(
      email,
      username,
      password,
      imageUrl
    );

    const response = await createNewUserRequest(formData);

    if (response) {
      setUser({ displayName: username, uid: password });
      history.push("/chats");
    } else {
      //show error
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <ImageUpload setImageUrl={setImageUrl} imageUrl={imageUrl} />
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
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default SignupFrom;
