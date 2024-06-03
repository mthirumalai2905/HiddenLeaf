import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      if (data.status === 'ok') {
        alert('Login successful');
        setUser(data);
        navigate('/account'); // Redirect to the account page after successful login
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (e) {
      setError("Login failed. Please try again.");
    }
  }

  return (
    <div className="mt-40 flex flex-col items-center justify-around">
      <h1 className="text-4xl text-center">Login</h1>
      <form className="max-w-md mx-auto mt-4" onSubmit={handleLoginSubmit}>
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
          Login
        </button>
        {error && <div className="text-center text-red-500 mt-2">{error}</div>}
        <div className="text-center py-2 text-gray-500">
          Don't have an account yet?{" "}
          <Link className="underline text-black" to={"/register"}>
            Register now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
