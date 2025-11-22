import React, { useState } from "react";
import { USER_ROLES } from '../context/UserContext';
import usersData from '../data/users.json';

function LoginForm({ onLogin }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: USER_ROLES.OPERATOR
  });
  const [loginError, setLoginError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setLoginError('Please fill in all required fields');
      return;
    }

    if (!isLoginMode) {
      // Signup mode validation
      if (formData.password !== formData.confirmPassword) {
        setLoginError('Passwords do not match');
        return;
      }
      
      // For demo purposes, simulate successful signup
      onLogin({
        name: formData.name || 'User',
        email: formData.email,
        role: formData.role,
        farmName: 'Smart Farm'
      });
      return;
    }

    // Login mode - authenticate against users database
    const user = usersData.find(u => 
      u.email.toLowerCase() === formData.email.toLowerCase() && 
      u.password === formData.password &&
      u.isActive
    );

    if (!user) {
      setLoginError('Invalid email or password. Please check your credentials.');
      return;
    }

    // Successful authentication
    onLogin({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      employeeId: user.employeeId,
      phone: user.phone,
      avatar: user.avatar,
      farmName: 'Smart Farm'
    });
  };

  return (
    <div className="w-[430px] bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      {/* Dairy Gold Logo and Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="text-center mb-4">
          <div className="inline-flex justify-center mb-4">
            <img 
              src="/dairy-gold-logo.png" 
              alt="Dairy Gold Logo" 
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Dairy Gold Zambia Limited</h1>
          <p className="text-sm text-gray-600 font-medium">Equipment Management System</p>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          {isLoginMode ? "Login" : "Sign Up"}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {isLoginMode ? "Welcome back to your dashboard" : "Join our equipment management system"}
        </p>
      </div>

      {/* Tab Controls */}
      <div className="relative flex h-12 mb-6 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        <button
          type="button"
          className={`w-1/2 text-lg font-medium transition-all z-10 ${
            isLoginMode ? "text-white" : "text-gray-700"
          }`}
          onClick={() => setIsLoginMode(true)}
        >
          Login
        </button>
        <button
          type="button"
          className={`w-1/2 text-lg font-medium transition-all z-10 ${
            !isLoginMode ? "text-white" : "text-gray-700"
          }`}
          onClick={() => setIsLoginMode(false)}
        >
          Signup
        </button>
        <div
          className={`absolute top-0 h-full w-1/2 rounded-md bg-gradient-to-r from-blue-600 to-blue-700 transition-all shadow-sm ${
            isLoginMode ? "left-0" : "left-1/2"
          }`}
        ></div>
      </div>

      {/* Form Section */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Signup-only Field */}
        {!isLoginMode && (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            required={!isLoginMode}
            className="w-full p-3 border-b-2 border-gray-200 outline-none focus:border-blue-500 placeholder-gray-400 bg-transparent"
          />
        )}

        {/* Role Selection - Only show for signup */}
        {!isLoginMode && (
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
            className="w-full p-3 border-b-2 border-gray-200 outline-none focus:border-blue-500 bg-transparent text-gray-700"
          >
            <option value={USER_ROLES.TECHNICAL_MANAGER}>Technical Manager</option>
            <option value={USER_ROLES.SUPERVISOR}>Supervisor</option>
            <option value={USER_ROLES.OPERATOR}>Operator</option>
            <option value={USER_ROLES.TECHNICIAN}>Technician</option>
          </select>
        )}

        {/* Shared Fields */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email Address"
          required
          className="w-full p-3 border-b-2 border-gray-200 outline-none focus:border-blue-500 placeholder-gray-400 bg-transparent"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
          className="w-full p-3 border-b-2 border-gray-200 outline-none focus:border-blue-500 placeholder-gray-400 bg-transparent"
        />

        {/* Signup-only Field */}
        {!isLoginMode && (
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            required={!isLoginMode}
            className="w-full p-3 border-b-2 border-gray-200 outline-none focus:border-blue-500 placeholder-gray-400 bg-transparent"
          />
        )}

        {/* Error Message */}
        {loginError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
            {loginError}
          </div>
        )}

        {/* Forgot Password (Only for Login) */}
        {isLoginMode && (
          <div className="text-right">
            <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
              Forgot password?
            </a>
          </div>
        )}

        {/* Submit Button */}
        <button 
          type="submit"
          className="w-full p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.01]"
        >
          {isLoginMode ? "Login" : "Signup"}
        </button>

        {/* Switch Mode Link */}
        <p className="text-center text-gray-600">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsLoginMode(!isLoginMode);
            }}
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium"
          >
            {isLoginMode ? "Signup now" : "Login"}
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
