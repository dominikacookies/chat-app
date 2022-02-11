import axios from "axios";

const getFile = async (url) => {
  const response = await fetch(url);
  const data = await response.blob();

  return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
};

export const generateSignUpFormData = async (
  email,
  username,
  password,
  imageUrl
) => {
  let formData = new FormData();
  formData.append("email", email);
  formData.append("username", username);
  formData.append("secret", password);

  const avatar = await getFile(imageUrl);
  formData.append("avatar", avatar, avatar.name);

  return formData;
};

export const createNewUserRequest = async (formData) => {
  try {
    const response = await axios.post(
      "https://api.chatengine.io/users",
      formData,
      {
        headers: { "private-key": process.env.REACT_APP_CHAT_PRIVATE_KEY },
      }
    );

    return response;
  } catch (error) {
    console.log("user creation err", error);
    return null;
  }
};
