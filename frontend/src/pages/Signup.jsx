import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8000/api";

function Signup() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [selectedNiches, setSelectedNiches] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const options = [
    "Frontend Development",
    "Backend Development",
    "Fullstack Development",
    "Web Development",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "UI/UX Design",
    "Cyber Security",
    "Mobile App Development",
    "Digital Marketing",
    "Loksewa Exam Preparation",
    "Bridge Course: +2 Science to Bachelor Science",
    "Bridge Course: +2 Commerce to Bachelor Commerce",
    "Business & Entrepreneurship",
    "Design & Multimedia",
  ];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/register`, form);
      setUserId(res.data.user._id);
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleNiche = (niche) => {
    if (selectedNiches.includes(niche)) {
      setSelectedNiches(selectedNiches.filter((n) => n !== niche));
    } else {
      if (selectedNiches.length < 3) {
        setSelectedNiches([...selectedNiches, niche]);
      } else {
        toast.error("You can select up to 3 niches only");
      }
    }
  };

  const handleSaveNiches = async () => {
    if (!selectedNiches.length) {
      toast.error("Select at least one niche");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/user/niches/${userId}`, {
        niches: selectedNiches,
      });
      toast.success("Account created successfully!");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-145px)] flex items-center justify-center bg-white dark:bg-gray-900 px-2 sm:px-4">
      <div className="w-full max-w-md p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md text-gray-900 dark:text-white">
        {/* Step Indicator */}
        <div className="flex items-center mb-6">
          <div
            className={`flex-1 h-1 transition-all duration-500 rounded ${
              step >= 1 ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`flex-1 h-1 mx-2 transition-all duration-500 rounded ${
              step === 2 ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
        </div>
        <div className="flex justify-between mb-6 text-sm font-medium text-gray-700 dark:text-gray-300">
          <span className={step === 1 ? "text-blue-600" : ""}>Step 1</span>
          <span className={step === 2 ? "text-blue-600" : ""}>Step 2</span>
        </div>

        {step === 1 && (
          <form onSubmit={handleSignup} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-center">Sign Up</h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded border"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded border"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded border"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 p-3 bg-blue-600 text-white rounded"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Select Your Top 3 Learning Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => toggleNiche(option)}
                  className={`px-3 py-1 rounded-full cursor-pointer text-sm transition-all duration-200 ${
                    selectedNiches.includes(option)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-800"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>

            <button
              onClick={handleSaveNiches}
              disabled={loading || selectedNiches.length === 0}
              className="w-full mt-3 p-3 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;
