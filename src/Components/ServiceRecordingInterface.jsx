import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes, FaCheck, FaExclamationTriangle, FaClock, FaTools, FaClipboardList, FaCamera, FaFileAlt } from 'react-icons/fa';
import machinesData from '../data/machines.json';

const ServiceRecordingInterface = ({ machineId, onClose }) => {
  const [machine, setMachine] = useState(null);
  const [serviceType, setServiceType] = useState('weekly'); // 'weekly' or 'maintenance'
  const [serviceData, setServiceData] = useState({
    type: 'weekly',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].slice(0, 5),
    technician: '',
    parameters: {},
    notes: '',
    issues: [],
    photos: [],
    nextServiceDate: '',
    status: 'in_progress' // 'in_progress', 'completed', 'issues_found'
  });

  const [currentParameterIndex, setCurrentParameterIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // Find the machine by ID
    const foundMachine = machinesData.find(m => m.id === parseInt(machineId));
    if (foundMachine) {
      setMachine(foundMachine);
      
      // Initialize parameter values
      const parameterValues = {};
      const parameterDefs = foundMachine.parameterDefinitions || [];
      
      parameterDefs.forEach(param => {
        parameterValues[param.name] = {
          value: '',
          status: 'normal', // 'normal', 'warning', 'critical'
          notes: '',
          timestamp: new Date().toISOString()
        };
      });

      setServiceData(prev => ({
        ...prev,
        parameters: parameterValues
      }));
    }
  }, [machineId]);

  // Parameter input validation
  const validateParameter = (param, value) => {
    const errors = [];
    
    if (param.required && (!value || value.trim() === '')) {
      errors.push('This parameter is required');
    }

    if (param.type === 'number' || param.type === 'current' || param.type === 'temperature' || param.type === 'pressure') {
      const numValue = parseFloat(value);
      if (value && isNaN(numValue)) {
        errors.push('Must be a valid number');
      } else if (!isNaN(numValue)) {
        if (param.minValue && numValue < parseFloat(param.minValue)) {
          errors.push(`Value must be at least ${param.minValue}`);
        }
        if (param.maxValue && numValue > parseFloat(param.maxValue)) {
          errors.push(`Value must not exceed ${param.maxValue}`);
        }
      }
    }

    if (param.type === 'percentage') {
      const numValue = parseFloat(value);
      if (value && !isNaN(numValue) && (numValue < 0 || numValue > 100)) {
        errors.push('Percentage must be between 0 and 100');
      }
    }

    return errors;
  };

  const updateParameterValue = (paramName, field, value) => {
    setServiceData(prev => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        [paramName]: {
          ...prev.parameters[paramName],
          [field]: value,
          timestamp: new Date().toISOString()
        }
      }
    }));

    // Clear validation errors for this parameter
    if (validationErrors[paramName]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[paramName];
        return newErrors;
      });
    }
  };

  const renderParameterInput = (param) => {
    const paramValue = serviceData.parameters[param.name] || {};
    const errors = validationErrors[param.name] || [];

    switch (param.type) {
      case 'dropdown':
        return (
          <select
            value={paramValue.value || ''}
            onChange={(e) => updateParameterValue(param.name, 'value', e.target.value)}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
              errors.length > 0 ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          >
            <option value="">Select {param.name}</option>
            {param.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'boolean':
        return (
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name={param.name}
                value="Yes"
                checked={paramValue.value === 'Yes'}
                onChange={(e) => updateParameterValue(param.name, 'value', e.target.value)}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name={param.name}
                value="No"
                checked={paramValue.value === 'No'}
                onChange={(e) => updateParameterValue(param.name, 'value', e.target.value)}
                className="mr-2"
              />
              No
            </label>
          </div>
        );

      case 'text':
        return (
          <input
            type="text"
            value={paramValue.value || ''}
            onChange={(e) => updateParameterValue(param.name, 'value', e.target.value)}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
              errors.length > 0 ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder={`Enter ${param.name.toLowerCase()}`}
          />
        );

      default: // number, current, temperature, pressure, percentage
        return (
          <div className="flex">
            <input
              type="number"
              step="0.01"
              value={paramValue.value || ''}
              onChange={(e) => updateParameterValue(param.name, 'value', e.target.value)}
              className={`flex-1 px-3 py-2 border rounded-l focus:outline-none focus:border-blue-500 ${
                errors.length > 0 ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            {param.unit && (
              <span className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r text-gray-600">
                {param.unit}
              </span>
            )}
          </div>
        );
    }
  };

  const renderStatusIndicator = (paramName) => {
    const paramValue = serviceData.parameters[paramName];
    if (!paramValue?.status) return null;

    const statusConfig = {
      normal: { icon: FaCheck, color: 'text-green-600', bg: 'bg-green-100' },
      warning: { icon: FaExclamationTriangle, color: 'text-yellow-600', bg: 'bg-yellow-100' },
      critical: { icon: FaExclamationTriangle, color: 'text-red-600', bg: 'bg-red-100' }
    };

    const config = statusConfig[paramValue.status];
    if (!config) return null;

    return (
      <div className={`inline-flex items-center px-2 py-1 rounded text-xs ${config.bg} ${config.color}`}>
        <config.icon className="mr-1" />
        {paramValue.status.charAt(0).toUpperCase() + paramValue.status.slice(1)}
      </div>
    );
  };

  const validateAllParameters = () => {
    const errors = {};
    const parameterDefs = machine?.parameterDefinitions || [];
    
    parameterDefs.forEach(param => {
      const value = serviceData.parameters[param.name]?.value || '';
      const paramErrors = validateParameter(param, value);
      if (paramErrors.length > 0) {
        errors[param.name] = paramErrors;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveService = () => {
    if (!validateAllParameters()) {
      alert('Please fix validation errors before saving');
      return;
    }

    if (!serviceData.technician.trim()) {
      alert('Please enter technician name');
      return;
    }

    // Convert parameter format to match serviceHistory.json structure
    const readings = {};
    Object.entries(serviceData.parameters).forEach(([paramName, paramData]) => {
      if (paramData.value) {
        readings[paramName] = paramData.value + (machine.parameterDefinitions?.find(p => p.name === paramName)?.unit ? ` ${machine.parameterDefinitions.find(p => p.name === paramName).unit}` : '');
      }
    });

    const serviceRecord = {
      id: Date.now(), // Simple ID generation
      equipmentId: parseInt(machineId),
      equipmentName: machine.name,
      serviceType: serviceData.type,
      date: serviceData.date,
      technician: serviceData.technician,
      readings: readings,
      notes: serviceData.notes || '',
      workPerformed: serviceData.type === 'maintenance' ? 'Maintenance work completed' : '',
      duration: '45 minutes' // Default duration
    };

    // Here you would typically save to a database or API
    console.log('Saving service record:', serviceRecord);

    alert('Service record saved successfully!');
    onClose();
  };

  const addIssue = () => {
    const issue = prompt('Describe the issue found:');
    if (issue?.trim()) {
      setServiceData(prev => ({
        ...prev,
        issues: [...prev.issues, {
          id: Date.now(),
          description: issue,
          severity: 'medium',
          timestamp: new Date().toISOString()
        }]
      }));
    }
  };

  const removeIssue = (issueId) => {
    setServiceData(prev => ({
      ...prev,
      issues: prev.issues.filter(issue => issue.id !== issueId)
    }));
  };

  if (!machine) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg">
          <p>Loading machine data...</p>
        </div>
      </div>
    );
  }

  const parameterDefs = machine.parameterDefinitions || [];
  const currentParam = parameterDefs[currentParameterIndex];
  const completedParams = Object.values(serviceData.parameters).filter(p => p.value !== '').length;
  const progressPercentage = parameterDefs.length > 0 ? (completedParams / parameterDefs.length) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl mx-4 my-8 rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center">
            <div className="mr-4">
              {serviceType === 'weekly' ? <FaClock className="text-2xl" /> : <FaTools className="text-2xl" />}
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {serviceType === 'weekly' ? 'Weekly Service' : 
                 serviceType === 'maintenance' ? 'Maintenance Recording' : 
                 'Breakdown/Emergency Service'}
              </h2>
              <p className="text-blue-100">
                {machine.name} • {machine.location} • S/N: {machine.serialNumber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-xl"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6">
          {/* Service Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
              <select
                value={serviceType}
                onChange={(e) => {
                  setServiceType(e.target.value);
                  setServiceData(prev => ({ ...prev, type: e.target.value }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="weekly">Weekly Service</option>
                <option value="maintenance">Maintenance/Repair</option>
                <option value="breakdown">Breakdown/Emergency</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Technician Name *</label>
              <input
                type="text"
                value={serviceData.technician}
                onChange={(e) => setServiceData(prev => ({ ...prev, technician: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Date</label>
              <input
                type="date"
                value={serviceData.date}
                onChange={(e) => setServiceData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Parameter Recording Progress</span>
              <span>{completedParams} / {parameterDefs.length} completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Parameter Recording */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaClipboardList className="mr-2 text-blue-600" />
              Parameter Recording
            </h3>

            {parameterDefs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No parameters defined for this machine type.</p>
                <p className="text-sm mt-1">Contact admin to add parameter definitions.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {parameterDefs.map((param, index) => (
                  <div key={param.name || index} className="bg-white rounded border p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {param.name}
                          {param.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        {param.description && (
                          <p className="text-xs text-gray-500 mb-2">{param.description}</p>
                        )}
                      </div>
                      {renderStatusIndicator(param.name)}
                    </div>

                    {renderParameterInput(param)}

                    {validationErrors[param.name] && (
                      <div className="mt-1">
                        {validationErrors[param.name].map((error, i) => (
                          <p key={i} className="text-red-500 text-xs">{error}</p>
                        ))}
                      </div>
                    )}

                    <div className="mt-2">
                      <label className="block text-xs text-gray-600 mb-1">Status</label>
                      <div className="flex space-x-2">
                        {['normal', 'warning', 'critical'].map(status => (
                          <label key={status} className="flex items-center">
                            <input
                              type="radio"
                              name={`status-${param.name}`}
                              value={status}
                              checked={serviceData.parameters[param.name]?.status === status}
                              onChange={(e) => updateParameterValue(param.name, 'status', e.target.value)}
                              className="mr-1"
                            />
                            <span className="text-xs capitalize">{status}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Notes (optional)"
                        value={serviceData.parameters[param.name]?.notes || ''}
                        onChange={(e) => updateParameterValue(param.name, 'notes', e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Issues & Notes Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <FaExclamationTriangle className="mr-2 text-yellow-600" />
                Issues Found
              </h4>
              <div className="space-y-2 mb-3">
                {serviceData.issues.map(issue => (
                  <div key={issue.id} className="flex items-center justify-between bg-yellow-50 border border-yellow-200 rounded p-2">
                    <span className="text-sm">{issue.description}</span>
                    <button
                      onClick={() => removeIssue(issue.id)}
                      className="text-red-600 hover:text-red-800 ml-2"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addIssue}
                className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200"
              >
                + Add Issue
              </button>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <FaFileAlt className="mr-2 text-blue-600" />
                Service Notes
              </h4>
              <textarea
                value={serviceData.notes}
                onChange={(e) => setServiceData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                rows={4}
                placeholder="Additional notes, observations, or recommendations..."
              />
            </div>
          </div>

          {/* Next Service Date */}
          {serviceType === 'weekly' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Next Scheduled Service Date
              </label>
              <input
                type="date"
                value={serviceData.nextServiceDate}
                onChange={(e) => setServiceData(prev => ({ ...prev, nextServiceDate: e.target.value }))}
                className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowSummary(true)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Preview Summary
            </button>
            <button
              onClick={handleSaveService}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
            >
              <FaSave className="mr-2" />
              Save Service Record
            </button>
          </div>
        </div>

        {/* Summary Modal */}
        {showSummary && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">Service Summary</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <strong>Equipment:</strong> {machine.name} ({machine.serialNumber})
                </div>
                <div>
                  <strong>Service Type:</strong> {serviceData.type}
                </div>
                <div>
                  <strong>Technician:</strong> {serviceData.technician}
                </div>
                <div>
                  <strong>Date:</strong> {serviceData.date}
                </div>
                <div>
                  <strong>Parameters Recorded:</strong> {completedParams} / {parameterDefs.length}
                </div>
                {serviceData.issues.length > 0 && (
                  <div>
                    <strong>Issues Found:</strong> {serviceData.issues.length}
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setShowSummary(false)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceRecordingInterface;