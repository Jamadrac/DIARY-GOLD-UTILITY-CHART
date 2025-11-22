import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import machinesData from '../data/machines.json';
import DailyLogs from './DailyLogs';
import PerformanceGraphs from './PerformanceGraphs';
import ServiceRecordingInterface from './ServiceRecordingInterface';
import ServiceHistoryViewer from './ServiceHistoryViewer';

const MachineRecording = ({ machineId }) => {
  const { user, canRecordDailyLog, canRecordMaintenance } = useUser();
  const [machine, setMachine] = useState(null);
  const [recordingData, setRecordingData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentRecordings, setRecentRecordings] = useState([]);
  const [activeView, setActiveView] = useState('menu'); // 'menu', 'recording', 'dailyLogs', 'performance', 'maintenance', 'history'

  useEffect(() => {
    // Find the machine
    const foundMachine = machinesData.find(m => m.id === machineId);
    setMachine(foundMachine);

    if (foundMachine) {
      // Initialize form with empty values
      const initialData = {};
      foundMachine.parameterDefinitions.forEach(param => {
        initialData[param.name] = '';
      });
      setRecordingData(initialData);
    }

    // Load recent recordings from localStorage
    const savedRecordings = localStorage.getItem('machineRecordings');
    if (savedRecordings) {
      const allRecordings = JSON.parse(savedRecordings);
      const machineRecordings = allRecordings.filter(r => r.machineId === machineId);
      setRecentRecordings(machineRecordings.slice(0, 5)); // Show last 5 recordings
    }
  }, [machineId]);

  // Check if user has any permissions
  const isTechnician = user?.role === 'technician' || user?.role === 'technical_manager' || user?.role === 'supervisor';
  const isOperator = user?.role === 'operator';

  // Role-based menu view - shown first when QR code is scanned
  if (activeView === 'menu') {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-brand-slateDark mb-2">
                {machine?.name || 'Machine Recording'}
              </h2>
              <p className="text-brand-slate">
                {machine?.location} • Serial: {machine?.serialNumber}
              </p>
            </div>

            {/* Technician/Manager Menu */}
            {isTechnician && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-brand-slateDark mb-4">What would you like to do?</h3>
                
                <button
                  onClick={() => setActiveView('maintenance')}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <div className="text-lg">📋 Record Maintenance</div>
                  <div className="text-sm text-green-100 mt-1">Record service and maintenance activities</div>
                </button>

                <button
                  onClick={() => setActiveView('history')}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <div className="text-lg">📊 View Service History</div>
                  <div className="text-sm text-purple-100 mt-1">Review past maintenance records</div>
                </button>

                <button
                  onClick={() => setActiveView('performance')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <div className="text-lg">📈 View Performance</div>
                  <div className="text-sm text-blue-100 mt-1">Analyze equipment performance metrics</div>
                </button>
              </div>
            )}

            {/* Operator Menu */}
            {isOperator && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-brand-slateDark mb-4">What would you like to record?</h3>
                
                <button
                  onClick={() => setActiveView('recording')}
                  className="w-full bg-gradient-to-r from-brand-blue to-brand-blueDark text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <div className="text-lg">⚙️ Daily Machine Log</div>
                  <div className="text-sm text-blue-100 mt-1">Record daily operational parameters</div>
                </button>

                <button
                  onClick={() => setActiveView('dailyLogs')}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <div className="text-lg">📅 Weekly Summary</div>
                  <div className="text-sm text-amber-100 mt-1">Review and summarize weekly logs</div>
                </button>
              </div>
            )}

            {/* No permissions */}
            {!isTechnician && !isOperator && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                <p className="font-semibold">Access Denied</p>
                <p>Your role does not have permission to record machine data.</p>
              </div>
            )}

            <button
              onClick={() => window.history.back()}
              className="mt-6 w-full px-4 py-2 border border-brand-border text-brand-slate rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!machine) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            Machine not found with ID: {machineId}
          </div>
        </div>
      </div>
    );
  }

  // Render different views based on activeView
  if (activeView === 'dailyLogs') {
    return (
      <div>
        <div className="p-4 bg-white border-b flex items-center justify-between">
          <h2 className="text-xl font-bold">{machine.name} - Daily Logs</h2>
          <button
            onClick={() => setActiveView('menu')}
            className="px-4 py-2 text-brand-slate border border-brand-border rounded hover:bg-gray-50"
          >
            ← Back to Menu
          </button>
        </div>
        <DailyLogs />
      </div>
    );
  }

  if (activeView === 'performance') {
    return (
      <div>
        <div className="p-4 bg-white border-b flex items-center justify-between">
          <h2 className="text-xl font-bold">{machine.name} - Performance Metrics</h2>
          <button
            onClick={() => setActiveView('menu')}
            className="px-4 py-2 text-brand-slate border border-brand-border rounded hover:bg-gray-50"
          >
            ← Back to Menu
          </button>
        </div>
        <PerformanceGraphs />
      </div>
    );
  }

  if (activeView === 'maintenance') {
    return (
      <div>
        <div className="p-4 bg-white border-b flex items-center justify-between">
          <h2 className="text-xl font-bold">{machine.name} - Maintenance Recording</h2>
          <button
            onClick={() => setActiveView('menu')}
            className="px-4 py-2 text-brand-slate border border-brand-border rounded hover:bg-gray-50"
          >
            ← Back to Menu
          </button>
        </div>
        <ServiceRecordingInterface machineId={machineId} onClose={() => setActiveView('menu')} />
      </div>
    );
  }

  if (activeView === 'history') {
    return (
      <div>
        <div className="p-4 bg-white border-b flex items-center justify-between">
          <h2 className="text-xl font-bold">{machine.name} - Service History</h2>
          <button
            onClick={() => setActiveView('menu')}
            className="px-4 py-2 text-brand-slate border border-brand-border rounded hover:bg-gray-50"
          >
            ← Back to Menu
          </button>
        </div>
        <ServiceHistoryViewer machineId={machineId} onClose={() => setActiveView('menu')} />
      </div>
    );
  }

  const handleInputChange = (paramName, value) => {
    setRecordingData(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  // Recording view for operators
  if (activeView === 'recording') {
    return (
      <div>
        <div className="p-4 bg-white border-b flex items-center justify-between">
          <h2 className="text-xl font-bold">{machine.name} - Daily Machine Log</h2>
          <button
            onClick={() => setActiveView('menu')}
            className="px-4 py-2 text-brand-slate border border-brand-border rounded hover:bg-gray-50"
          >
            ← Back to Menu
          </button>
        </div>

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newRecording = {
      id: Date.now(),
      machineId: machine.id,
      machineName: machine.name,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      operator: user.name,
      readings: { ...recordingData },
      notes: recordingData.notes || ''
    };

    // Save to localStorage
    const savedRecordings = localStorage.getItem('machineRecordings');
    const allRecordings = savedRecordings ? JSON.parse(savedRecordings) : [];
    const updatedRecordings = [newRecording, ...allRecordings];
    localStorage.setItem('machineRecordings', JSON.stringify(updatedRecordings));

    // Update recent recordings display
    const machineRecordings = updatedRecordings.filter(r => r.machineId === machineId);
    setRecentRecordings(machineRecordings.slice(0, 5));

    // Reset form
    const initialData = {};
    machine.parameterDefinitions.forEach(param => {
      initialData[param.name] = '';
    });
    setRecordingData(initialData);

    setIsSubmitting(false);
    alert(`Recording saved successfully for ${machine.name}!`);
  };

  const renderInputField = (param) => {
    const value = recordingData[param.name] || '';
    
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
              step="0.1"
              value={value.replace('%', '')}
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
              onChange={(e) => handleInputChange(param.name, param.unit ? `${e.target.value} ${param.unit}` : e.target.value)}
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

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800';
      case 'maintenance_required':
        return 'bg-yellow-100 text-yellow-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'chiller':
        return '❄️';
      case 'compressor':
        return '🔧';
      case 'hvac':
        return '🌀';
      case 'boiler':
        return '🔥';
      case 'pump':
        return '💧';
      default:
        return '⚙️';
    }
  };

  // Render different views based on activeView state
  if (activeView === 'dailyLogs') {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <button
              onClick={() => setActiveView('recording')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Back to {machine.name} Recording
            </button>
          </div>
          <DailyLogs />
        </div>
      </div>
    );
  }

  if (activeView === 'performance') {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <button
              onClick={() => setActiveView('recording')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Back to {machine.name} Recording
            </button>
          </div>
          <PerformanceGraphs />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <button
              onClick={() => {
                window.history.pushState(null, null, '/record');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Back to Machine Selection
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{getTypeIcon(machine.type)}</div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{machine.name}</h1>
                  <p className="text-gray-600">{machine.location} • {machine.serialNumber}</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadgeColor(machine.status)}`}>
                {machine.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recording Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  📊 Record Parameters
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({machine.parameterDefinitions.length} parameters)
                  </span>
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {machine.parameterDefinitions.map(param => (
                      <div key={param.name} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          {param.name} 
                          {param.required && <span className="text-red-500 ml-1">*</span>}
                          {param.unit && <span className="text-gray-400 ml-1">({param.unit})</span>}
                        </label>
                        <p className="text-xs text-gray-500">{param.description}</p>
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
                      value={recordingData.notes || ''}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter any observations, maintenance notes, or other comments..."
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {isSubmitting ? 'Recording...' : 'Save Recording'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const initialData = {};
                        machine.parameterDefinitions.forEach(param => {
                          initialData[param.name] = '';
                        });
                        setRecordingData(initialData);
                      }}
                      className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700"
                    >
                      Clear Form
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setActiveView('dailyLogs')}
                  className="w-full flex items-center justify-between px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-medium">View Daily Logs</span>
                  </div>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => setActiveView('performance')}
                  className="w-full flex items-center justify-between px-4 py-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="font-medium">Performance Graphs</span>
                  </div>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Machine Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Machine Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium capitalize">{machine.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{machine.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Serial Number:</span>
                  <span className="font-medium">{machine.serialNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Service:</span>
                  <span className="font-medium">{new Date(machine.lastService).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Service:</span>
                  <span className="font-medium">{new Date(machine.nextService).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Recent Recordings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Recordings</h3>
              {recentRecordings.length === 0 ? (
                <p className="text-gray-500 text-sm">No recent recordings</p>
              ) : (
                <div className="space-y-3">
                  {recentRecordings.map(recording => (
                    <div key={recording.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-medium text-gray-900">{recording.date}</span>
                        <span className="text-xs text-gray-500">{recording.time}</span>
                      </div>
                      <p className="text-xs text-gray-600">By: {recording.operator}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {Object.keys(recording.readings).length} parameters recorded
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Current Parameters */}
            {machine.parameters && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Current Values</h3>
                <div className="space-y-2">
                  {machine.parameters.slice(0, 5).map(param => (
                    <div key={param.name} className="flex justify-between text-sm">
                      <span className="text-gray-600">{param.name}:</span>
                      <span className={`font-medium ${
                        param.status === 'normal' ? 'text-green-600' : 
                        param.status === 'warning' ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {param.value}
                      </span>
                    </div>
                  ))}
                  {machine.parameters.length > 5 && (
                    <p className="text-xs text-gray-500 mt-2">
                      +{machine.parameters.length - 5} more parameters
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    );
  }

  // Default recording view return for operators
  return (
    <div></div>
  );
};

export default MachineRecording;