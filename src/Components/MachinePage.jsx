import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaTools, FaCheckCircle } from 'react-icons/fa';
import machinesData from '../data/machines.json';

const MachinePage = ({ machineId }) => {
  const [machine, setMachine] = useState(null);
  const [serviceType, setServiceType] = useState('');
  const [serviceNotes, setServiceNotes] = useState('');
  const [technicianName, setTechnicianName] = useState('');
  const [serviceSubmitted, setServiceSubmitted] = useState(false);

  // Simulated machine data - in real app this would come from API
  const getMachineById = (id) => {
    return machinesData.find(machine => machine.id === parseInt(id));
  };

  useEffect(() => {
    if (machineId) {
      const foundMachine = getMachineById(machineId);
      setMachine(foundMachine);
    }
  }, [machineId]);

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    if (!serviceType || !technicianName) {
      alert('Please fill in all required fields');
      return;
    }

    // Simulate service recording
    console.log('Service recorded:', {
      machineId,
      serviceType,
      technicianName,
      serviceNotes,
      timestamp: new Date().toISOString()
    });

    setServiceSubmitted(true);
    setTimeout(() => {
      setServiceSubmitted(false);
      setServiceType('');
      setServiceNotes('');
      setTechnicianName('');
    }, 3000);
  };

  const goBack = () => {
    window.history.back();
  };

  if (!machine) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <button onClick={goBack} className="flex items-center text-blue-600 hover:text-blue-800 mr-4">
              <FaArrowLeft className="mr-2" />
              Back
            </button>
            <h1 className="text-3xl font-bold">Machine Not Found</h1>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <p>Machine with ID "{machineId}" was not found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button onClick={goBack} className="flex items-center text-blue-600 hover:text-blue-800 mr-4">
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <div>
            <h1 className="text-3xl font-bold">{machine.name}</h1>
            <p className="text-gray-600">{machine.location} • {machine.serialNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Machine Details */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaTools className="mr-2" />
              Machine Details
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Type:</span>
                <span className="capitalize">{machine.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className={`px-2 py-1 rounded text-xs uppercase font-semibold ${
                  machine.status === 'operational' ? 'bg-green-100 text-green-800' :
                  machine.status === 'maintenance_required' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {machine.status.replace('_', ' ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Last Service:</span>
                <span>{machine.lastService}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Next Service:</span>
                <span>{machine.nextService}</span>
              </div>
            </div>

            {/* Parameters */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Current Parameters</h3>
              <div className="space-y-2">
                {machine.parameters.map((param, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{param.name}:</span>
                    <div className="flex items-center">
                      <span className="mr-2">{param.value}</span>
                      <span className={`w-2 h-2 rounded-full ${
                        param.status === 'normal' ? 'bg-green-500' :
                        param.status === 'warning' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service Recording Form */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Record Service</h2>
            
            {serviceSubmitted ? (
              <div className="flex items-center justify-center py-8 text-green-600">
                <FaCheckCircle className="text-3xl mr-3" />
                <div>
                  <p className="text-lg font-semibold">Service Recorded Successfully!</p>
                  <p className="text-sm">Thank you for updating the machine status.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleServiceSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Technician Name *
                  </label>
                  <input
                    type="text"
                    value={technicianName}
                    onChange={(e) => setTechnicianName(e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Service Type *
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select service type</option>
                    <option value="weekly">Weekly Maintenance</option>
                    <option value="maintenance">Scheduled Maintenance</option>
                    <option value="breakdown">Breakdown Repair</option>
                    <option value="upgrade">Equipment Upgrade</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Service Notes
                  </label>
                  <textarea
                    value={serviceNotes}
                    onChange={(e) => setServiceNotes(e.target.value)}
                    rows="4"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter any notes about the service performed..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                >
                  Record Service
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachinePage;