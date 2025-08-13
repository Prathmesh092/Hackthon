import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      if (err.response?.status === 429) {
        setMessage("You’ve made too many requests. Please try again in 15 minutes.");
      } else {
        setMessage(err.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send OTP</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;
