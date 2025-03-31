import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/user/signup", newUser, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-screen h-screen bg-blue-50 flex justify-center items-center">
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg flex flex-col gap-6 w-96 border border-gray-200"
      >
        <h2 className="text-gray-900 text-3xl font-semibold text-center">Create Account</h2>

        <input
          type="text"
          name="fullName"
          onChange={handleChange}
          className="text-lg outline-none py-3 px-4 rounded-md bg-gray-100 text-gray-800 placeholder-gray-500 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300"
          placeholder="Full Name"
          required
        />

        <input
          type="email"
          name="email"
          onChange={handleChange}
          className="text-lg outline-none py-3 px-4 rounded-md bg-gray-100 text-gray-800 placeholder-gray-500 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300"
          placeholder="Email"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            className="text-lg outline-none py-3 px-4 rounded-md bg-gray-100 text-gray-800 placeholder-gray-500 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 w-full pr-10"
            placeholder="Password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-10-7-10-7 1.5-2.5 3.5-4.5 6-5.5m10 1c1.5 1 3 2.5 4 4 0 0-3 7-10 7-1.5 0-2.875-.175-4.125-.5M3 3l18 18" />
              </svg>
            )}
          </button>
        </div>

        <button className="bg-blue-600 text-white px-4 py-3 rounded-md font-semibold text-lg shadow-md hover:bg-blue-700 transition duration-300">
          Sign Up
        </button>

        <p className="text-gray-600 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
