import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig"; // Adjust path if needed
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // For Google Sign-In
import { useNavigate } from "react-router-dom";


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "", // Add name field
  });
  const [resetEmail, setResetEmail] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const navigate = useNavigate(); // Hook to navigate after success

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("User registered:", userCredential.user);
      alert("Registration successful!");
      navigate("/Mood"); // Redirect to another page after registration
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
    }
  };

  // Handle Google Sign-In
  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google user:", result.user);
      alert("Signed in with Google!");
      navigate("/Mood"); // Redirect to another page after Google sign-in
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      alert(error.message);
    }
  };

  // Handle password reset form submission
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset email sent!");
      setResetEmail("");
      setShowResetForm(false);
    } catch (error) {
      console.error("Reset Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <button type="submit">Register</button>
      </form>

      {/* Google Sign-In Button */}
      <button onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>

      {/* Password Reset Link */}
      <p style={{ marginTop: "10px" }}>
        <button
          type="button"
          onClick={() => setShowResetForm(!showResetForm)}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Forgot Password?
        </button>
      </p>

      {/* Reset Form */}
      {showResetForm && (
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Email</button>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
