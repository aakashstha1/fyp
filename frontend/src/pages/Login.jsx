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
    console.log("Login info :",form)
    toast.success("Login successful!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 dark:bg-gray-800 w-full max-w-md p-6 sm:p-8 rounded-xl shadow-xl text-gray-900 dark:text-white
          sm:max-w-lg
          mx-2
          "
        style={{ minWidth: 0 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 placeholder-gray-500 dark:placeholder-gray-300"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="off"
            required
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 placeholder-gray-500 dark:placeholder-gray-300"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 transition-all p-3 rounded-md text-white font-semibold
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Log In
        </button>

        <p className="text-sm text-center mt-6">
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
