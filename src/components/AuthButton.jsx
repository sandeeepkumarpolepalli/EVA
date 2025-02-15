import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/${isLogin ? "login" : "signup"}`;
  
    try {
      const response = await axios.post(url, formData);
  
      alert(response.data.message);
  
      if (isLogin && response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        navigate("/home");
      }
  
      setFormData({ username: "", email: "", password: "" });
      setIsOpen(true);
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred.");
    }
  };
  


  return (
    <>
      <div className="flex items-center gap-6">
        <button
          onClick={() => setIsOpen(true)}
          className="block px-6 bg-transparent py-2 text-lg font-medium relative overflow-hidden rounded-3xl text-white group hover:text-blue-500 transition-colors duration-300"
        >
          <span className="relative z-10">{isLogin ? "Login" : "Sign Up"}</span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
          <span className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-800 group-hover:w-full transition-all duration-300 rounded-full" />
          <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-gradient-to-l from-blue-500 to-blue-800 group-hover:w-full transition-all duration-300 rounded-full" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-gray-900 p-8 rounded-lg w-96 border border-blue-800 shadow-xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors bg-transparent"
            >
              ×
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-gray-400">
                {isLogin
                  ? "Please enter your credentials"
                  : "Fill in your information"}
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label className="block text-gray-300 mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter username"
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter password"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-transparent w-full px-6 py-2 text-lg font-medium relative overflow-hidden rounded-3xl text-white group hover:text-blue-500 transition-colors duration-300 mt-6"
              >
                <span className="relative z-10">
                  {isLogin ? "Login" : "Sign Up"}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                <span className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-800 group-hover:w-full transition-all duration-300 rounded-full" />
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-gradient-to-l from-blue-500 to-blue-800 group-hover:w-full transition-all duration-300 rounded-full" />
              </button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="bg-transparent text-blue-500 hover:text-blue-400 text-sm"
                >
                  {isLogin
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthButton;
