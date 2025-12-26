import React from "react";
import { auth } from "./firebase/firebaseConfig";

const Welcome = () => {
  const user = auth.currentUser;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user?.displayName || "User"}! 👋</h1>
      
    </div>
  );
};

export default Welcome;
