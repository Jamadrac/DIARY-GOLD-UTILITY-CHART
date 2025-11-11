import React, { useState } from 'react';
import { FaQrcode, FaKeyboard, FaExternalLinkAlt } from 'react-icons/fa';
import machinesData from '../data/machines.json';

const QRScanner = () => {
  const [machineId, setMachineId] = useState('');
  const [error, setError] = useState('');

  const handleMachineAccess = () => {
    if (!machineId) {
      setError('Please enter a machine ID');
      return;
    }

    // Validate machine ID (basic check)
    if (!/^\d+$/.test(machineId)) {
      setError('Machine ID should be a number (e.g., 1, 2, 3)');
      return;
    }

    // Navigate to machine page
    const url = `/machines/${machineId}`;
    window.history.pushState({}, '', url);
    window.location.reload();
  };

  const quickAccessMachines = machinesData.slice(0, 4).map(machine => ({
    id: machine.id.toString(),
    name: machine.name,
    location: machine.location
  }));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <FaQrcode className="mr-3 text-blue-600" />
            Machine Access
          </h1>
          <p className="text-gray-600">
            Access machine service pages by entering machine ID or using quick access
          </p>
        </div>

        {/* Manual Entry Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FaKeyboard className="text-6xl text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-center">Enter Machine ID</h2>
            <p className="text-gray-600 text-center">
              Type the machine ID number from the QR code label
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="text"
                value={machineId}
                onChange={(e) => setMachineId(e.target.value)}
                placeholder="Machine ID (e.g., 1, 2, 3)"
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleMachineAccess()}
              />
              <button
                onClick={handleMachineAccess}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                <FaExternalLinkAlt className="inline mr-2" />
                Access
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
          <p className="text-gray-600 mb-4">
            Click on any machine below to access its service page directly:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickAccessMachines.map((machine) => (
              <button
                key={machine.id}
                onClick={() => {
                  const url = `/machines/${machine.id}`;
                  window.history.pushState({}, '', url);
                  window.location.reload();
                }}
                className="p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-left"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{machine.name}</p>
                    <p className="text-sm text-gray-600">{machine.location}</p>
                    <p className="text-xs text-gray-500 mt-1">ID: {machine.id}</p>
                  </div>
                  <FaExternalLinkAlt className="text-blue-600" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-900">How to access machines:</h3>
          <ol className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="font-semibold mr-2">1.</span>
              <span>Find the machine ID number on the QR code label (usually printed below the QR code)</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">2.</span>
              <span>Enter the ID in the input field above and click "Access"</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">3.</span>
              <span>Or use the "Quick Access" buttons for commonly used machines</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">4.</span>
              <span>Fill in the service recording form on the machine page</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
