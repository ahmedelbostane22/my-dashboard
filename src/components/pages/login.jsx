import React, { useState } from "react";
import Inputs from "../Layout/inputs";
import Button from "../Layout/botton";
import { auth } from "../Layout/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // ✅ مهم
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // ✅ بعد تسجيل الدخول
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Email or password is incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-indigo-100 flex justify-center items-center h-screen w-screen">
      <div className="border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl shadow-indigo-900/20 w-96">
        <h1 className="font-bold text-center block text-2xl mb-4">
          Log In
        </h1>

        <form onSubmit={handleLogin}>
          <Inputs
            type="email"
            name="email"
            label="Email Address"
            placeholder="me@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Inputs
            type="password"
            name="password"
            label="Password"
            placeholder="••••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-md text-sm font-medium transition w-full mt-4 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
