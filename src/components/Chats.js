import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";

import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  async function fetchData() {
    try {
      await axios.get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": process.env.REACT_APP_PROJECT_CHAT_ID,
          "user-name": user.displayName,
          "user-secret": user.uid,
        },
      });

      setLoading(false);
    } catch (error) {
      let formData = new FormData();
      formData.append("email", user.email);
      formData.append("username", user.displayName);
      formData.append("secret", user.uid);

      const avatar = await getFile(user.photoURL);
      formData.append("avatar", avatar, avatar.name);

      try {
        await axios.post("https://api.chatengine.io/users", formData, {
          headers: { "private-key": process.env.REACT_APP_CHAT_PRIVATE_KEY },
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    fetchData();
  }, [loading, user]);

  return !loading && user ? (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Chat</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_PROJECT_CHAT_ID}
        userName={user.displayName}
        userSecret={user.uid}
      />
    </div>
  ) : (
    <h1> Sit tight, we're loading your information.</h1>
  );
};

export default Chats;
