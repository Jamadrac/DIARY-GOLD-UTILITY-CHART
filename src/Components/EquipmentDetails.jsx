import React, { useState, useEffect } from 'react';
import { FaTemperatureHigh, FaTint, FaBolt, FaTachometerAlt, FaChartLine, FaExclamationTriangle, FaWrench, FaCheckCircle, FaCog } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import machinesData from '../data/machines.json';
import serviceHistoryData from '../data/serviceHistory.json';

const EquipmentDetails = ({ equipmentId }) => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [recentServiceHistory, setRecentServiceHistory] = useState([]);

  useEffect(() => {
    // Find the selected equipment from machines data
    const equipment = machinesData.find(machine => machine.id === equipmentId);
    setSelectedEquipment(equipment);

    // Get recent service history for this equipment
    if (equipmentId) {
      const history = serviceHistoryData
        .filter(record => record.equipmentId === equipmentId)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
      setRecentServiceHistory(history);
    }
  }, [equipmentId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-green-600 bg-green-50';
      case 'maintenance_required': return 'text-yellow-600 bg-yellow-50';
      case 'offline': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'chiller': return <FaTemperatureHigh className="text-3xl text-blue-500" />;
      case 'compressor': return <FaTachometerAlt className="text-3xl text-cyan-500" />;
      case 'genset': return <FaBolt className="text-3xl text-yellow-500" />;
      case 'hvac': return <FaWrench className="text-3xl text-green-500" />;
      case 'motor': return <FaCog className="text-3xl text-purple-500" />;
      case 'pump': return <FaTint className="text-3xl text-blue-600" />;
      default: return <FaWrench className="text-3xl text-gray-500" />;
    }
  };

  // Sample performance data for the charts
  const performanceData = [
    { time: '00:00', efficiency: 85, temperature: 18, pressure: 4.2, current: 240 },
    { time: '04:00', efficiency: 87, temperature: 17, pressure: 4.1, current: 238 },
    { time: '08:00', efficiency: 89, temperature: 18, pressure: 4.3, current: 245 },
    { time: '12:00', efficiency: 91, temperature: 19, pressure: 4.2, current: 242 },
    { time: '16:00', efficiency: 88, temperature: 18, pressure: 4.1, current: 240 },
    { time: '20:00', efficiency: 86, temperature: 17, pressure: 4.0, current: 238 }
  ];

  if (!selectedEquipment) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            Equipment not found with ID: {equipmentId}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Equipment Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              {getTypeIcon(selectedEquipment.type)}
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedEquipment.name}</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Type</p>
                    <p className="font-semibold capitalize">{selectedEquipment.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Location</p>
                    <p className="font-semibold">{selectedEquipment.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Serial Number</p>
                    <p className="font-semibold">{selectedEquipment.serialNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedEquipment.status)}`}>
                      {selectedEquipment.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Parameters */}
        {selectedEquipment.parameters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaChartLine className="mr-2 text-blue-500" />
              Current Parameters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedEquipment.parameters.map((param, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                  param.status === 'normal' ? 'border-green-500 bg-green-50' : 
                  param.status === 'warning' ? 'border-yellow-500 bg-yellow-50' : 
                  'border-red-500 bg-red-50'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{param.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      param.status === 'normal' ? 'bg-green-100 text-green-800' : 
                      param.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {param.status}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {param.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 24-Hour Performance History */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">24-Hour Performance History</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#3b82f6" strokeWidth={2} name="Temperature (°C)" />
              <Line yAxisId="left" type="monotone" dataKey="pressure" stroke="#10b981" strokeWidth={2} name="Pressure (bar)" />
              <Line yAxisId="right" type="monotone" dataKey="current" stroke="#8b5cf6" strokeWidth={2} name="Current (A)" />
              <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#f59e0b" strokeWidth={2} name="Efficiency (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Equipment Information & Service History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Equipment Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Equipment Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Last Service:</span>
                <span className="font-semibold">{new Date(selectedEquipment.lastService).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Next Service:</span>
                <span className="font-semibold">{new Date(selectedEquipment.nextService).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Parameters:</span>
                <span className="font-semibold">{selectedEquipment.parameterDefinitions?.length || 0} defined</span>
              </div>
            </div>
          </div>

          {/* Recent Service History */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Service History</h2>
            {recentServiceHistory.length === 0 ? (
              <p className="text-gray-500 text-sm">No recent service records</p>
            ) : (
              <div className="space-y-3">
                {recentServiceHistory.map((record, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium text-gray-900">{new Date(record.date).toLocaleDateString()}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        record.serviceType === 'maintenance' ? 'bg-blue-100 text-blue-800' :
                        record.serviceType === 'repair' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {record.serviceType}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Technician: {record.technician}</p>
                    {record.workPerformed && (
                      <p className="text-xs text-gray-500 mt-1">{record.workPerformed.substring(0, 60)}...</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Parameter Definitions */}
        {selectedEquipment.parameterDefinitions && selectedEquipment.parameterDefinitions.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Recordable Parameters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedEquipment.parameterDefinitions.map((param, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-900">{param.name}</h3>
                    {param.required && (
                      <span className="text-red-500 text-xs">Required</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{param.description}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Type: {param.type}</span>
                    {param.unit && <span>Unit: {param.unit}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <FaWrench />
              <span>Schedule Maintenance</span>
            </button>
            <button className="bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
              <FaChartLine />
              <span>View Performance Report</span>
            </button>
            <button className="bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2">
              <FaExclamationTriangle />
              <span>Report Issue</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetails;