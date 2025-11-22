import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import machinesData from '../data/machines.json';

const DailyLogs = () => {
  const { user, canRecordDailyLog } = useUser();
  const [selectedEquipment, setSelectedEquipment] = useState(1);
  const [logData, setLogData] = useState({});
  const [logs, setLogs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load existing logs from localStorage
    const savedLogs = localStorage.getItem('dailyLogs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }

    // Initialize form with current equipment parameters
    const equipment = machinesData.find(m => m.id === selectedEquipment);
    if (equipment) {
      const initialData = {};
      equipment.parameterDefinitions.forEach(param => {
        initialData[param.name] = '';
      });
      setLogData(initialData);
    }
  }, [selectedEquipment]);

  if (!canRecordDailyLog()) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Access Denied: You don't have permission to record daily logs.
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (paramName, value) => {
    setLogData(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const equipment = machinesData.find(m => m.id === selectedEquipment);
    const newLog = {
      id: Date.now(),
      equipmentId: selectedEquipment,
      equipmentName: equipment?.name,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      operator: user.name,
      readings: { ...logData },
      notes: logData.notes || ''
    };

    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem('dailyLogs', JSON.stringify(updatedLogs));

    // Reset form
    const initialData = {};
    equipment?.parameterDefinitions.forEach(param => {
      initialData[param.name] = '';
    });
    setLogData(initialData);

    setIsSubmitting(false);
    alert('Daily log recorded successfully!');
  };

  const equipment = machinesData.find(m => m.id === selectedEquipment);
  const todaysLogs = logs.filter(log => log.date === new Date().toISOString().split('T')[0]);

  const renderInputField = (param) => {
    const value = logData[param.name] || '';
    
    switch (param.type) {
      case 'dropdown':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(param.name, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required={param.required}
          >
            <option value="">Select {param.name}</option>
            {param.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case 'percentage':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="0"
              max="100"
              value={value}
              onChange={(e) => handleInputChange(param.name, `${e.target.value}%`)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${param.name}`}
              required={param.required}
            />
            <span className="text-gray-500">%</span>
          </div>
        );
      
      case 'temperature':
      case 'pressure':
      case 'current':
      case 'number':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="number"
              step="0.1"
              value={value.replace(/[^\d.-]/g, '')}
              onChange={(e) => handleInputChange(param.name, `${e.target.value} ${param.unit || ''}`)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${param.name}`}
              required={param.required}
            />
            {param.unit && <span className="text-gray-500">{param.unit}</span>}
          </div>
        );
      
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(param.name, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder={`Enter ${param.name}`}
            required={param.required}
          />
        );
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Daily Equipment Logs</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recording Form */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Record Daily Readings</h2>
              
              {/* Equipment Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Equipment
                </label>
                <select
                  value={selectedEquipment}
                  onChange={(e) => setSelectedEquipment(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {machinesData.map(machine => (
                    <option key={machine.id} value={machine.id}>
                      {machine.name} - {machine.location}
                    </option>
                  ))}
                </select>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {equipment?.parameterDefinitions.map(param => (
                    <div key={param.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {param.name} {param.required && <span className="text-red-500">*</span>}
                      </label>
                      <p className="text-xs text-gray-500 mb-2">{param.description}</p>
                      {renderInputField(param)}
                    </div>
                  ))}
                </div>

                {/* Notes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={logData.notes || ''}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter any observations or notes..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Recording...' : 'Record Daily Log'}
                </button>
              </form>
            </div>
          </div>

          {/* Today's Logs */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Today's Logs</h2>
              
              {todaysLogs.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No logs recorded today</p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {todaysLogs.map(log => (
                    <div key={log.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">{log.equipmentName}</h3>
                        <span className="text-sm text-gray-500">{log.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Operator: {log.operator}</p>
                      {log.notes && (
                        <p className="text-sm text-gray-600 italic">Notes: {log.notes}</p>
                      )}
                      <div className="mt-2 text-xs text-gray-500">
                        {Object.keys(log.readings).length - 1} parameters recorded
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Logs Table */}
        <div className="mt-8 bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Logs (Last 7 Days)</h2>
            
            {logs.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No logs recorded yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Time</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Equipment</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Operator</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Parameters</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.slice(0, 10).map(log => (
                      <tr key={log.id} className="border-t border-gray-200">
                        <td className="px-4 py-2 text-sm text-gray-900">{log.date}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{log.time}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{log.equipmentName}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{log.operator}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">
                          {Object.keys(log.readings).length - 1} recorded
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyLogs;
