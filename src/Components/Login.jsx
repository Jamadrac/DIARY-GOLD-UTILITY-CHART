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
      
      // Signup is demo only - show message
      setLoginError('Signup is for demo only. Please use test accounts below to login.');
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
      <div className="flex flex-col items-center mb-8">
        <div className="text-center mb-6">
          <div className="inline-flex justify-center mb-3">
            <img 
              src="/dairy-gold-logo.png" 
              alt="Dairy Gold Logo" 
              className="h-14 w-auto"
            />
          </div>
          <h1 className="text-xl font-semibold text-brand-slateDark">Dairy Gold Zambia Limited</h1>
          <p className="text-xs text-brand-grayMuted font-medium mt-1">Equipment Management System</p>
        </div>
        <h2 className="text-2xl font-bold text-brand-slateDark">
          {isLoginMode ? "Login" : "Sign Up"}
        </h2>
        <p className="text-sm text-brand-slate mt-2">
          {isLoginMode ? "Welcome back to your dashboard" : "Join our equipment management system"}
        </p>
      </div>

      {/* Tab Controls */}
      <div className="relative flex h-12 mb-6 border border-brand-border rounded-lg overflow-hidden bg-gray-50">
        <button
          type="button"
          className={`w-1/2 text-sm font-semibold transition-all z-10 ${
            isLoginMode ? "text-white" : "text-brand-slate"
          }`}
          onClick={() => setIsLoginMode(true)}
        >
          Login
        </button>
        {/* <button
          type="button"
          className={`w-1/2 text-sm font-semibold transition-all z-10 ${
            !isLoginMode ? "text-white" : "text-brand-slate"
          }`}
          onClick={() => setIsLoginMode(false)}
        >
          Signup
        </button> */}
        <div
          className={`absolute top-0 h-full w-1/2 bg-gradient-to-r from-brand-blue to-brand-blueDark transition-all shadow-sm rounded-md ${
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
            placeholder="Full Name"
            required={!isLoginMode}
            className="w-full px-3 py-2 border-b border-brand-border outline-none focus:border-brand-blue placeholder-brand-grayMuted bg-transparent text-brand-slate"
          />
        )}

        {/* Role Selection - Only show for signup */}
        {!isLoginMode && (
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border-b border-brand-border outline-none focus:border-brand-blue bg-transparent text-brand-slate"
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
          className="w-full px-3 py-2 border-b border-brand-border outline-none focus:border-brand-blue placeholder-brand-grayMuted bg-transparent text-brand-slate"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
          className="w-full px-3 py-2 border-b border-brand-border outline-none focus:border-brand-blue placeholder-brand-grayMuted bg-transparent text-brand-slate"
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
            className="w-full px-3 py-2 border-b border-brand-border outline-none focus:border-brand-blue placeholder-brand-grayMuted bg-transparent text-brand-slate"
          />
        )}

        {/* Error Message */}
        {loginError && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-3 py-2 rounded-md text-sm">
            {loginError}
          </div>
        )}

        {/* Forgot Password (Only for Login) */}
        {isLoginMode && (
          <div className="text-right mt-4">
            <a href="#" className="text-sm text-brand-blue hover:text-brand-blueDark transition-colors font-medium">
              Forgot password?
            </a>
          </div>
        )}

        {/* Submit Button */}
        <button 
          type="submit"
          className="w-full mt-6 p-3 bg-gradient-to-r from-brand-blue to-brand-blueDark text-white rounded-lg font-semibold hover:from-brand-blueDark hover:to-brand-blue transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {isLoginMode ? "Login" : "Sign Up"}
        </button>

        {/* Demo Notice for Signup */}
        {!isLoginMode && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mt-4">
            <p className="text-xs text-blue-800">
              <strong>Note:</strong> Signup is for demonstration only. Use test accounts to login.
            </p>
          </div>
        )}

        {/* Switch Mode Link */}
        <p className="text-center text-sm text-brand-slate mt-4">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsLoginMode(!isLoginMode);
              setLoginError(''); // Clear errors when switching
            }}
            className="text-brand-blue hover:text-brand-blueDark transition-colors font-semibold"
          >
            {isLoginMode ? "fred" : "Log in"}
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
