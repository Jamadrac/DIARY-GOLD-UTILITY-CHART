import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user roles and their permissions
export const USER_ROLES = {
  TECHNICAL_MANAGER: 'technical_manager',
  SUPERVISOR: 'supervisor',
  OPERATOR: 'operator',
  TECHNICIAN: 'technician'
};

export const PERMISSIONS = {
  ADD_MACHINE: 'add_machine',
  DELETE_MACHINE: 'delete_machine',
  RECORD_DAILY_LOG: 'record_daily_log',
  RECORD_MAINTENANCE: 'record_maintenance',
  VIEW_REPORTS: 'view_reports',
  VIEW_PERFORMANCE: 'view_performance'
};

// Define role permissions
const ROLE_PERMISSIONS = {
  [USER_ROLES.TECHNICAL_MANAGER]: [
    PERMISSIONS.ADD_MACHINE,
    PERMISSIONS.DELETE_MACHINE,
    PERMISSIONS.RECORD_DAILY_LOG,
    PERMISSIONS.RECORD_MAINTENANCE,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.VIEW_PERFORMANCE
  ],
  [USER_ROLES.SUPERVISOR]: [
    PERMISSIONS.ADD_MACHINE,
    PERMISSIONS.DELETE_MACHINE,
    PERMISSIONS.RECORD_DAILY_LOG,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.VIEW_PERFORMANCE
  ],
  [USER_ROLES.OPERATOR]: [
    PERMISSIONS.RECORD_DAILY_LOG,
    PERMISSIONS.VIEW_PERFORMANCE
  ],
  [USER_ROLES.TECHNICIAN]: [
    PERMISSIONS.RECORD_DAILY_LOG,
    PERMISSIONS.RECORD_MAINTENANCE,
    PERMISSIONS.VIEW_PERFORMANCE
  ]
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored user session on app load
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData) => {
    // Update last login time
    const enhancedUserData = {
      ...userData,
      lastLogin: new Date().toISOString()
    };
    
    setUser(enhancedUserData);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(enhancedUserData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const hasPermission = (permission) => {
    if (!user || !user.role) return false;
    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    return userPermissions.includes(permission);
  };

  const canAddMachine = () => hasPermission(PERMISSIONS.ADD_MACHINE);
  const canDeleteMachine = () => hasPermission(PERMISSIONS.DELETE_MACHINE);
  const canRecordDailyLog = () => hasPermission(PERMISSIONS.RECORD_DAILY_LOG);
  const canRecordMaintenance = () => hasPermission(PERMISSIONS.RECORD_MAINTENANCE);
  const canViewReports = () => hasPermission(PERMISSIONS.VIEW_REPORTS);
  const canViewPerformance = () => hasPermission(PERMISSIONS.VIEW_PERFORMANCE);

  const getRoleDisplayName = (role) => {
    switch (role) {
      case USER_ROLES.TECHNICAL_MANAGER:
        return 'Technical Manager';
      case USER_ROLES.SUPERVISOR:
        return 'Supervisor';
      case USER_ROLES.OPERATOR:
        return 'Operator';
      case USER_ROLES.TECHNICIAN:
        return 'Technician';
      default:
        return 'Unknown';
    }
  };

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  };

  const isManager = () => {
    return user?.role === USER_ROLES.TECHNICAL_MANAGER;
  };

  const isSupervisor = () => {
    return user?.role === USER_ROLES.SUPERVISOR;
  };

  const isOperator = () => {
    return user?.role === USER_ROLES.OPERATOR;
  };

  const isTechnician = () => {
    return user?.role === USER_ROLES.TECHNICIAN;
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    hasPermission,
    canAddMachine,
    canDeleteMachine,
    canRecordDailyLog,
    canRecordMaintenance,
    canViewReports,
    canViewPerformance,
    getRoleDisplayName,
    getUserInitials,
    isManager,
    isSupervisor,
    isOperator,
    isTechnician,
    USER_ROLES,
    PERMISSIONS
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
