import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const Navbar = ({ activeModule, setActiveModule }) => {
  const { user, logout, canAddMachine, canRecordDailyLog, canRecordMaintenance, canViewPerformance, getRoleDisplayName, getUserInitials } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Define navigation items with role-based visibility
  const allNavItems = [
    {
      id: 'overview',
      name: 'Overview',
      showForRoles: ['all'],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'equipment-management',
      name: 'Equipment Management',
      showForRoles: ['technical_manager', 'supervisor'],
      requiresPermission: () => canAddMachine(),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },

    {
      id: 'machine-selection',
      name: 'Machine Recording',
      showForRoles: ['operator', 'technician'],
      requiresPermission: () => canRecordDailyLog(),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 011-1h1m-1 1v1h1m-1-1H4m3 0h.01M7 16h.01M11 16h.01" />
        </svg>
      )
    },
    {
      id: 'service-recording',
      name: 'Maintenance Recording',
      showForRoles: ['technician'],
      requiresPermission: () => canRecordMaintenance(),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V5a1 1 0 011-1h3a1 1 0 001-1V2a2 2 0 114 0z" />
        </svg>
      )
    },
    {
      id: 'service-history',
      name: 'Service History',
      showForRoles: ['all'],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },

    {
      id: 'maintenance',
      name: 'Maintenance Schedule',
      showForRoles: ['all'],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },

  ];

  // Filter nav items based on user role and permissions
  const navItems = allNavItems.filter(item => {
    if (item.showForRoles.includes('all')) {
      return !item.requiresPermission || item.requiresPermission();
    }
    const hasRoleAccess = item.showForRoles.includes(user?.role);
    const hasPermission = !item.requiresPermission || item.requiresPermission();
    return hasRoleAccess && hasPermission;
  });

  return (
    <nav className="bg-brand-nav text-white shadow-md fixed w-full top-0 z-50 border-b border-brand-border font-brand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img
                src="/dairy-gold-logo.png"
                alt="Dairy Gold Logo"
                className="h-8 w-auto mr-3 drop-shadow-sm"
              />
              <div className="hidden sm:block">
                <h1 className="py-2 text-lg font-semibold tracking-wide">
                  Dairy Gold   
                </h1>
                
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'machine-selection') {
                    window.history.pushState(null, null, '/record');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  } else {
                    setActiveModule(item.id);
                  }
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors ${
                  activeModule === item.id
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'text-brand-gray hover:text-white hover:bg-brand-blue/70'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          {/* User Profile Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-brand-gray hover:text-white hover:bg-brand-blue/60 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-500 shadow-sm"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-full hover:bg-blue-50 transition-colors"
              >
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`w-8 h-8 bg-gradient-to-r from-brand-blue to-brand-blueDark rounded-full flex items-center justify-center shadow-sm ${user?.avatar ? 'hidden' : ''}`}>
                  <span className="text-white text-sm font-medium">
                    {getUserInitials()}
                  </span>
                </div>
                <div className="hidden md:block">
                  <span className="text-white font-medium block">
                    {user?.name || 'User'}
                  </span>
                  <span className="text-xs text-brand-grayMuted">
                    {getRoleDisplayName(user?.role)} • {user?.department}
                  </span>
                </div>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 border border-brand-border">
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-white text-sm font-medium">
                            {getUserInitials()}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-brand-slateDark">{user?.name}</p>
                        <p className="text-xs text-brand-grayMuted">{user?.employeeId}</p>
                        <p className="text-xs text-brand-blue font-medium">{getRoleDisplayName(user?.role)}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      // Add settings functionality
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-brand-slate hover:bg-brand-blue/10 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      // Add settings functionality
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-brand-slate hover:bg-brand-blue/10 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </button>
                  <div className="border-t border-brand-border"></div>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-brand-gray hover:text-white hover:bg-brand-blue/50 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-brand-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'machine-selection') {
                    window.history.pushState(null, null, '/record');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  } else {
                    setActiveModule(item.id);
                  }
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left font-medium transition-colors ${
                  activeModule === item.id
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'text-brand-slate hover:text-brand-blueDark hover:bg-brand-bg'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
