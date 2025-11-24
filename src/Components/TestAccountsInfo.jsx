import React, { useState } from 'react';

const TestAccountsInfo = () => {
  const [isVisible, setIsVisible] = useState(true); // Changed to true by default

  const testAccounts = [
    {
      role: 'Technical Manager',
      email: 'mukuka.tembo@company.com',
      name: 'Mukuka Tembo',
      permissions: 'Full system access - Add/Edit/Delete equipment',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      role: 'Technician',
      email: 'bwalya.kasongo@company.com',
      name: 'Bwalya Kasongo', 
      permissions: 'Record maintenance + Daily logs',
      color: 'bg-orange-100 text-orange-800'
    },
    {
      role: 'Operator',
      email: 'rajesh.patel@company.com', 
      name: 'Rajesh Patel',
      permissions: 'Record daily machine logs only',
      color: 'bg-green-100 text-green-800'
    },
    {
      role: 'Supervisor', 
      email: 'priya.sharma@company.com',
      name: 'Priya Sharma',
      permissions: 'Manage equipment + View all reports',
      color: 'bg-blue-100 text-blue-800'
    }
  ];

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 bg-brand-blue text-white px-4 py-2 rounded-lg shadow-lg hover:bg-brand-blueDark transition-colors z-50 text-sm font-medium flex items-center space-x-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <span>Show Test Accounts</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-white rounded-xl shadow-2xl border-2 border-brand-blue p-5 w-96 z-50 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h3 className="font-bold text-brand-slateDark">Demo Test Accounts</h3>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600 font-bold text-xl"
        >
          ×
        </button>
      </div>
      
      <div className="mb-3 bg-blue-50 border border-blue-200 rounded-lg p-2">
        <p className="text-xs text-blue-800 font-medium text-center">
          👉 Use these accounts to test different role permissions
        </p>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {testAccounts.map((account, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold text-sm text-brand-slateDark">{account.name}</span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${account.color}`}>
                {account.role}
              </span>
            </div>
            <div className="flex items-center space-x-1 mb-1">
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-xs text-gray-600 font-mono">{account.email}</p>
            </div>
            <p className="text-xs text-gray-500 italic">{account.permissions}</p>
          </div>
        ))}
        
        <div className="mt-4 pt-3 border-t-2 border-gray-200 bg-yellow-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-xs font-semibold text-gray-700">Password for all accounts:</p>
          </div>
          <p className="text-center">
            <span className="font-mono bg-white border border-yellow-300 px-3 py-1 rounded text-sm font-bold text-gray-800">
              password123
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestAccountsInfo;