import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.email === "" || form.password === "") {
      toast.error("Please enter both email and password.");
      return;
    }

    console.log("Login info:", form);
    toast.success("Login successful!");
    navigate("/");
  };

  return (
    <div className="min-h-[calc(100vh-145px)] flex items-center justify-center bg-white dark:bg-gray-900 px-2 sm:px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 dark:bg-gray-800 w-full max-w-sm p-4 sm:p-6 rounded-lg shadow-md text-gray-900 dark:text-white"
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Login</h2>

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 sm:p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-sm placeholder-gray-500 dark:placeholder-gray-300"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="off"
            required
            className="w-full p-2 sm:p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-sm placeholder-gray-500 dark:placeholder-gray-300"
          />

          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-5 bg-blue-600 hover:bg-blue-700 transition p-2 sm:p-3 rounded text-white font-medium text-sm"
        >
          Log In
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
