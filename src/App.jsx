import React, { useState } from 'react'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    // In a real app, you would validate credentials here
    setUser({
      name: userData.name || 'Admin',
      email: userData.email,
      role: userData.role || 'Administrator',
      facilityName: userData.facilityName || 'Main Facility'
    });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  if (isLoggedIn) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className='grid w-[100%] h-screen place-items-center bg-cyan-400'>
      <Login onLogin={handleLogin} />
    </div>
  )
}

export default App