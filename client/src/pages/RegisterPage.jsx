import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("/register", { name, email, password });
      setSuccess("Registration successful!");
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError("Registration failed. Please try again.");
      setSuccess("");
    }
  }

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <h1 className="text-4xl text-center mb-4">Register</h1>
      <form className="max-w-md w-full mx-auto" onSubmit={registerUser}>
        <input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          className="w-full border my-1 py-2 px-3 rounded-2xl"
        />
        <input
          type="email"
          placeholder="your@gmail.com"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          className="w-full border my-1 py-2 px-3 rounded-2xl"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className="w-full border my-1 py-2 px-3 rounded-2xl"
        />
        <button className="bg-primary p-2 w-full text-white rounded-2xl mt-2">
          Register
        </button>
        {error && <div className="text-center text-red-500 mt-2">{error}</div>}
        {success && <div className="text-center text-green-500 mt-2">{success}</div>}
        <div className="text-center py-2 text-gray-500">
          Already a member?{" "}
          <Link className="underline text-black" to="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
