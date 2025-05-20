import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
const API_URL = "http://localhost:8000/api";
function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await axios.post(`${API_URL}/auth/register`, form, {
        withCredentials: true,
      });
      toast.success(res?.data?.message || "Account created Succesfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message || "Failed to create account!");
      throw new Error(error.response.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-145px)] flex items-center justify-center bg-white dark:bg-gray-900 px-2 sm:px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 dark:bg-gray-800 w-full max-w-sm p-6 rounded-lg shadow-md text-gray-900 dark:text-white"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
          Sign Up
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-sm placeholder-gray-500 dark:placeholder-gray-300"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-sm placeholder-gray-500 dark:placeholder-gray-300"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-sm placeholder-gray-500 dark:placeholder-gray-300"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center mt-5 bg-blue-600 hover:bg-blue-700 transition p-3 rounded text-white font-medium text-sm"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign Up"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
