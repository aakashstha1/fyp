import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";



function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });//add values to form
  };
 const navigate = useNavigate(); //navigation system for automaticallly done
  const handleSubmit = (e) => {
    e.preventDefault();//to stop automatically submit
    if (form.password !== form.confirmPassword) { 
      toast.error("Password mismatch: Please make sure your passwords match.");
    //check password and cpassword match or not
      return;
    }
    console.log("Signup info:", form);
   toast.success("Signup complete! You have successfully signed up.");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 dark:bg-gray-800 w-full max-w-md p-6 sm:p-8 rounded-xl shadow-xl text-gray-900 dark:text-white"
        style={{ minWidth: 0 }} 
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
              focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 dark:placeholder-gray-300"
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
              focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 dark:placeholder-gray-300"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
              focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 dark:placeholder-gray-300"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
                focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 dark:placeholder-gray-300"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
                focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 dark:placeholder-gray-300"
            />
          </div>

          {/* Role Selection - stacked on mobile, inline on desktop */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-sm font-medium sm:mb-0 sm:mr-2 whitespace-nowrap">
              Signup as:
            </label>
            <div className="flex gap-4 flex-wrap">
              {["student", "professor","admin"].map((roleOption) => (
                <label key={roleOption} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value={roleOption}
                    checked={form.role === roleOption}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  <span className="capitalize">{roleOption}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition-all p-3 rounded-md text-white font-medium"
        >
          Sign Up
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
