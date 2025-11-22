import React, { useState } from 'react';

const TestAccountsInfo = () => {
  const [isVisible, setIsVisible] = useState(false);

  const testAccounts = [
    {
      role: 'Technical Manager',
      email: 'mukuka.tembo@company.com',
      name: 'Mukuka Tembo',
      permissions: 'Full system access'
    },
    {
      role: 'Supervisor', 
      email: 'priya.sharma@company.com',
      name: 'Priya Sharma',
      permissions: 'Manage equipment, view reports'
    },
    {
      role: 'Operator',
      email: 'rajesh.patel@company.com', 
      name: 'Rajesh Patel',
      permissions: 'Record daily logs only'
    },
    {
      role: 'Technician',
      email: 'bwalya.kasongo@company.com',
      name: 'Bwalya Kasongo', 
      permissions: 'Daily logs + maintenance'
    }
  ];

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors z-50 text-sm"
      >
        Show Test Accounts
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80 z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-900">Test Accounts</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-3">
        {testAccounts.map((account, index) => (
          <div key={index} className="border border-gray-100 rounded p-3">
            <div className="flex justify-between items-start mb-1">
              <span className="font-medium text-sm text-gray-900">{account.name}</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{account.role}</span>
            </div>
            <p className="text-xs text-gray-600 mb-1">{account.email}</p>
            <p className="text-xs text-gray-500">{account.permissions}</p>
          </div>
        ))}
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Password for all accounts: <span className="font-mono bg-gray-100 px-1 rounded">password123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestAccountsInfo;