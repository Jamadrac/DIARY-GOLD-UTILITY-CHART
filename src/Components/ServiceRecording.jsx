import React, { useState, useEffect } from 'react';
import { FaClipboardCheck, FaTools, FaSave, FaTimes } from 'react-icons/fa';

const ServiceRecording = ({ equipmentId }) => {
  // Sample equipment with their configured parameters
  const [equipment] = useState([
    { 
      id: 1, 
      name: 'Industrial Chiller 1', 
      type: 'chiller',
      parameters: [
        { name: 'Blade State', type: 'text', unit: '', category: 'condition' },
        { name: 'Compressor Current Phase 1', type: 'number', unit: 'A', category: 'electrical' },
        { name: 'Compressor Current Phase 2', type: 'number', unit: 'A', category: 'electrical' },
        { name: 'Compressor Current Phase 3', type: 'number', unit: 'A', category: 'electrical' },
        { name: 'Circulation Pump State', type: 'text', unit: '', category: 'condition' },
        { name: 'Circulation Pump Current Phase 1', type: 'number', unit: 'A', category: 'electrical' },
        { name: 'Circulation Pump Current Phase 2', type: 'number', unit: 'A', category: 'electrical' },
        { name: 'Circulation Pump Current Phase 3', type: 'number', unit: 'A', category: 'electrical' },
        { name: 'Antifreeze Percentage', type: 'number', unit: '%', category: 'fluid' },
        { name: 'Lab Results', type: 'text', unit: '', category: 'condition' },
        { name: 'Expansion Valve State', type: 'text', unit: '', category: 'condition' },
        { name: 'Icing Status', type: 'select', unit: '', category: 'condition', options: ['No Icing', 'Slight Icing', 'Heavy Icing'] },
        { name: 'Service Pump State', type: 'text', unit: '', category: 'condition' },
        { name: 'Service Pump Current', type: 'number', unit: 'A', category: 'electrical' },
        { name: 'Blower Fan Motor State', type: 'text', unit: '', category: 'condition' },
        { name: 'Blower Fan Blades State', type: 'text', unit: '', category: 'condition' },
        { name: 'Oil Level', type: 'number', unit: '%', category: 'fluid' },
        { name: 'Refrigerant Gas Pressure', type: 'number', unit: 'PSI', category: 'pressure' },
        { name: 'Compressor Oil Level', type: 'number', unit: '%', category: 'fluid' },
        { name: 'Cooling Tower State', type: 'text', unit: '', category: 'condition' },
        { name: 'Cooling Tower Water Level', type: 'number', unit: '%', category: 'fluid' }
      ]
    },
    { 
      id: 2, 
      name: 'Air Compressor A', 
      type: 'compressor',
      parameters: [
        { name: 'Oil Level', type: 'number', unit: '%', category: 'fluid' },
        { name: 'Current', type: 'number', unit: 'A', category: 'electrical' },
        { name: 'Filter Condition', type: 'text', unit: '', category: 'condition' }
      ]
    }
  ]);

  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [serviceType, setServiceType] = useState('weekly');
  const [recordingData, setRecordingData] = useState({
    date: new Date().toISOString().split('T')[0],
    technician: '',
    readings: {},
    notes: '',
    workPerformed: ''
  });

  // Auto-select equipment if coming from QR code scan
  useEffect(() => {
    if (equipmentId) {
      const id = parseInt(equipmentId);
      const selectedEquip = equipment.find(e => e.id === id);
      if (selectedEquip) {
        setSelectedEquipment(String(equipmentId));
        const initialReadings = {};
        selectedEquip.parameters.forEach(param => {
          initialReadings[param.name] = '';
        });
        setRecordingData({
          date: new Date().toISOString().split('T')[0],
          technician: '',
          readings: initialReadings,
          notes: '',
          workPerformed: ''
        });
      } else {
        alert('Equipment not found. Please select from the list.');
      }
    }
  }, [equipmentId]);

  const handleEquipmentSelect = (equipmentId) => {
    setSelectedEquipment(equipmentId);
    const selectedEquip = equipment.find(e => e.id === parseInt(equipmentId));
    if (selectedEquip) {
      const initialReadings = {};
      selectedEquip.parameters.forEach(param => {
        initialReadings[param.name] = '';
      });
      setRecordingData({
        ...recordingData,
        readings: initialReadings
      });
    }
  };

  const handleReadingChange = (paramName, value) => {
    setRecordingData({
      ...recordingData,
      readings: {
        ...recordingData.readings,
        [paramName]: value
      }
    });
  };

  const handleSubmit = () => {
    const selectedEquip = equipment.find(e => e.id === parseInt(selectedEquipment));
    const record = {
      equipmentId: selectedEquipment,
      equipmentName: selectedEquip?.name,
      serviceType: serviceType,
      date: recordingData.date,
      technician: recordingData.technician,
      readings: recordingData.readings,
      notes: recordingData.notes,
      workPerformed: recordingData.workPerformed,
      timestamp: new Date().toISOString()
    };
    
    console.log('Service Record:', record);
    alert(`${serviceType === 'weekly' ? 'Weekly Service' : 'Maintenance'} record saved successfully!`);
    
    // Reset form
    setSelectedEquipment('');
    setRecordingData({
      date: new Date().toISOString().split('T')[0],
      technician: '',
      readings: {},
      notes: '',
      workPerformed: ''
    });
  };

  const handleCancel = () => {
    setSelectedEquipment('');
    setRecordingData({
      date: new Date().toISOString().split('T')[0],
      technician: '',
      readings: {},
      notes: '',
      workPerformed: ''
    });
  };

  const selectedEquip = equipment.find(e => e.id === parseInt(selectedEquipment));

  // Group parameters by category
  const groupedParameters = selectedEquip?.parameters.reduce((acc, param) => {
    if (!acc[param.category]) {
      acc[param.category] = [];
    }
    acc[param.category].push(param);
    return acc;
  }, {});

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Record Service / Maintenance</h1>

        {/* Service Type and Equipment Selection */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="weekly">Weekly Service</option>
                <option value="maintenance">Maintenance (Repair/Upgrade)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Equipment</label>
              <select
                value={selectedEquipment}
                onChange={(e) => handleEquipmentSelect(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select Equipment --</option>
                {equipment.map(equip => (
                  <option key={equip.id} value={equip.id}>{equip.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={recordingData.date}
                onChange={(e) => setRecordingData({ ...recordingData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Technician Name</label>
            <input
              type="text"
              value={recordingData.technician}
              onChange={(e) => setRecordingData({ ...recordingData, technician: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter technician name"
            />
          </div>
        </div>

        {/* Parameter Recording Form */}
        {selectedEquip && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center mb-4">
              {serviceType === 'weekly' ? (
                <FaClipboardCheck className="text-blue-600 text-2xl mr-3" />
              ) : (
                <FaTools className="text-orange-600 text-2xl mr-3" />
              )}
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{selectedEquip.name}</h2>
                <p className="text-sm text-gray-600">
                  {serviceType === 'weekly' ? 'Weekly Service Recording' : 'Maintenance Recording'}
                </p>
              </div>
            </div>

            {/* Parameters grouped by category */}
            <div className="space-y-6">
              {Object.entries(groupedParameters || {}).map(([category, params]) => (
                <div key={category} className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3 capitalize">
                    {category.replace(/([A-Z])/g, ' $1').trim()} Parameters
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {params.map((param, index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {param.name} {param.unit && <span className="text-gray-500">({param.unit})</span>}
                        </label>
                        {param.type === 'number' && (
                          <input
                            type="number"
                            step="0.01"
                            value={recordingData.readings[param.name] || ''}
                            onChange={(e) => handleReadingChange(param.name, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder={`Enter ${param.name.toLowerCase()}`}
                          />
                        )}
                        {param.type === 'text' && (
                          <input
                            type="text"
                            value={recordingData.readings[param.name] || ''}
                            onChange={(e) => handleReadingChange(param.name, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder={`Enter ${param.name.toLowerCase()}`}
                          />
                        )}
                        {param.type === 'select' && (
                          <select
                            value={recordingData.readings[param.name] || ''}
                            onChange={(e) => handleReadingChange(param.name, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">-- Select --</option>
                            {param.options?.map((option, i) => (
                              <option key={i} value={option}>{option}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Work Performed (for maintenance) */}
            {serviceType === 'maintenance' && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Performed</label>
                <textarea
                  value={recordingData.workPerformed}
                  onChange={(e) => setRecordingData({ ...recordingData, workPerformed: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Describe the repair/upgrade work performed..."
                ></textarea>
              </div>
            )}

            {/* Notes */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
              <textarea
                value={recordingData.notes}
                onChange={(e) => setRecordingData({ ...recordingData, notes: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Any additional observations or notes..."
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition"
              >
                <FaSave /> <span>Save Record</span>
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-600 transition"
              >
                <FaTimes /> <span>Cancel</span>
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!selectedEquip && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Instructions</h3>
            <ul className="list-disc list-inside text-blue-700 space-y-1">
              <li>Select the type of service: <strong>Weekly Service</strong> for routine checks or <strong>Maintenance</strong> for repairs/upgrades</li>
              <li>Choose the equipment you want to record</li>
              <li>Fill in all the parameter readings as per the equipment's current state</li>
              <li>For maintenance records, describe the work performed</li>
              <li>Add any additional notes or observations</li>
              <li>Click "Save Record" to store the service record</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceRecording;
