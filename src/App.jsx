import React from 'react'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import TestAccountsInfo from './Components/TestAccountsInfo'
import { UserProvider, useUser } from './context/UserContext'
import { BrowserRouter } from 'react-router-dom'

const AppContent = () => {
  const { isAuthenticated, login } = useUser();

  const handleLogin = (userData) => {
    login(userData);
  };

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <div className='grid w-[100%] h-screen place-items-center bg-gradient-to-br from-gray-50 via-dairygold-50 to-gray-100 relative'>
      <Login onLogin={handleLogin} />
      <TestAccountsInfo />
    </div>
  )
}

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </UserProvider>
  )
}

export default App