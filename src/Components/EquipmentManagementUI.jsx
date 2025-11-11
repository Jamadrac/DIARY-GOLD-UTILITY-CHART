import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaQrcode, FaPrint, FaExternalLinkAlt, FaCog, FaTimes, FaClipboardList, FaHistory } from 'react-icons/fa';
import machinesData from '../data/machines.json';
import ServiceRecordingInterface from './ServiceRecordingInterface';
import ServiceHistoryViewer from './ServiceHistoryViewer';

const EquipmentManagementUI = () => {
  const [equipment, setEquipment] = useState(machinesData);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    type: 'chiller', 
    location: '', 
    serialNumber: '', 
    parameters: [],
    parameterDefinitions: []
  });

  // Parameter management states
  const [showParameterModal, setShowParameterModal] = useState(false);
  const [parameterDefinitions, setParameterDefinitions] = useState([]);
  const [newParameter, setNewParameter] = useState({
    name: '',
    type: 'text', // text, number, dropdown, percentage, temperature, pressure, current, boolean
    unit: '',
    required: true,
    options: [], // for dropdown type
    minValue: '',
    maxValue: '',
    description: ''
  });

  // Predefined parameter templates for different machine types
  const parameterTemplates = {
    chiller: [
      { name: 'Compressor Current Phase 1', type: 'current', unit: 'A', required: true, description: 'Phase 1 compressor current reading' },
      { name: 'Compressor Current Phase 2', type: 'current', unit: 'A', required: true, description: 'Phase 2 compressor current reading' },
      { name: 'Compressor Current Phase 3', type: 'current', unit: 'A', required: true, description: 'Phase 3 compressor current reading' },
      { name: 'Circulation Pump State', type: 'dropdown', options: ['Excellent', 'Good', 'Fair', 'Poor', 'Replace'], required: true, description: 'Condition of circulation pump' },
      { name: 'Circulation Pump Current', type: 'current', unit: 'A', required: true, description: 'Circulation pump current draw' },
      { name: 'Antifreeze Percentage', type: 'percentage', unit: '%', required: true, description: 'Antifreeze concentration from lab results' },
      { name: 'Expansion Valve State', type: 'dropdown', options: ['Normal', 'Icing', 'Blocked', 'Replace'], required: true, description: 'Expansion valve condition' },
      { name: 'Service Pump State', type: 'dropdown', options: ['Running', 'Stopped', 'Maintenance'], required: true, description: 'Service pump operational state' },
      { name: 'Service Pump Current', type: 'current', unit: 'A', required: true, description: 'Service pump current reading' },
      { name: 'Blower Fan Motor State', type: 'dropdown', options: ['Excellent', 'Good', 'Noisy', 'Vibrating', 'Replace'], required: true, description: 'Blower fan motor condition' },
      { name: 'Fan Blade Condition', type: 'dropdown', options: ['Excellent', 'Good', 'Worn', 'Damaged', 'Replace'], required: true, description: 'Condition of fan blades' },
      { name: 'Oil Level', type: 'dropdown', options: ['Full', 'Good', 'Low', 'Critical', 'Empty'], required: true, description: 'Compressor oil level' },
      { name: 'Refrigerant Level', type: 'pressure', unit: 'PSI', required: true, description: 'Gas refrigerant pressure level' },
      { name: 'Compressor Oil Level', type: 'dropdown', options: ['Full', 'Good', 'Low', 'Change Required'], required: true, description: 'Compressor oil condition' },
      { name: 'Cooling Tower State', type: 'dropdown', options: ['Excellent', 'Good', 'Needs Cleaning', 'Maintenance Required'], required: true, description: 'Cooling tower condition' },
      { name: 'Water Level', type: 'dropdown', options: ['Full', 'Normal', 'Low', 'Critical'], required: true, description: 'Cooling tower water level' }
    ],
    compressor: [
      { name: 'Oil Level', type: 'dropdown', options: ['Full', 'Good', 'Low', 'Critical', 'Empty'], required: true, description: 'Compressor oil level' },
      { name: 'Current Reading', type: 'current', unit: 'A', required: true, description: 'Motor current consumption' },
      { name: 'Filter Condition', type: 'dropdown', options: ['Clean', 'Dirty', 'Replace', 'Clogged'], required: true, description: 'Air filter condition' }
    ],
    pump: [
      { name: 'Flow Rate', type: 'number', unit: 'L/min', required: true, description: 'Pump flow rate' },
      { name: 'Pressure', type: 'pressure', unit: 'bar', required: true, description: 'System pressure' },
      { name: 'Motor Current', type: 'current', unit: 'A', required: true, description: 'Motor current draw' },
      { name: 'Bearing Temperature', type: 'temperature', unit: '°C', required: true, description: 'Bearing temperature' },
      { name: 'Seal Condition', type: 'dropdown', options: ['Excellent', 'Good', 'Leaking', 'Replace'], required: true, description: 'Mechanical seal condition' },
      { name: 'Vibration Level', type: 'number', unit: 'mm/s', required: true, description: 'Vibration measurement' }
    ],
    hvac: [
      { name: 'Air Flow Rate', type: 'number', unit: 'CFM', required: true, description: 'Air flow measurement' },
      { name: 'Filter Status', type: 'dropdown', options: ['Clean', 'Dirty', 'Replace', 'Clogged'], required: true, description: 'Air filter condition' },
      { name: 'Coil Temperature', type: 'temperature', unit: '°C', required: true, description: 'Evaporator coil temperature' },
      { name: 'Fan Motor Current', type: 'current', unit: 'A', required: true, description: 'Fan motor current' },
      { name: 'Humidity Level', type: 'percentage', unit: '%', required: true, description: 'Relative humidity' },
      { name: 'Room Temperature', type: 'temperature', unit: '°C', required: true, description: 'Room temperature reading' }
    ],
    boiler: [
      { name: 'Water Temperature', type: 'temperature', unit: '°C', required: true, description: 'Boiler water temperature' },
      { name: 'System Pressure', type: 'pressure', unit: 'bar', required: true, description: 'System pressure reading' },
      { name: 'Gas Flow Rate', type: 'number', unit: 'm³/h', required: true, description: 'Gas consumption rate' },
      { name: 'Flue Gas Temperature', type: 'temperature', unit: '°C', required: true, description: 'Flue gas temperature' },
      { name: 'CO₂ Level', type: 'percentage', unit: '%', required: true, description: 'Carbon dioxide percentage' },
      { name: 'Water Flow Rate', type: 'number', unit: 'L/min', required: true, description: 'Water circulation rate' }
    ]
  };

  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrTarget, setQrTarget] = useState(null);

  // Service recording states
  const [showServiceRecording, setShowServiceRecording] = useState(false);
  const [selectedMachineForService, setSelectedMachineForService] = useState(null);

  // Service history states
  const [showServiceHistory, setShowServiceHistory] = useState(false);
  const [selectedMachineForHistory, setSelectedMachineForHistory] = useState(null);

  const handleAdd = () => { 
    setIsAdding(true); 
    setFormData({ 
      name: '', 
      type: 'chiller', 
      location: '', 
      serialNumber: '', 
      parameters: [],
      parameterDefinitions: []
    }); 
    setParameterDefinitions([]);
  };

  const handleEdit = (item) => { 
    setEditingId(item.id); 
    setFormData(item); 
    setParameterDefinitions(item.parameterDefinitions || []);
  };

  const handleDelete = (id) => { 
    if (window.confirm('Are you sure you want to delete this equipment? This action cannot be undone.')) {
      setEquipment(equipment.filter(e => e.id !== id)); 
    }
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.serialNumber.trim() || !formData.location.trim()) {
      alert('Please fill in all required fields (Name, Serial Number, Location)');
      return;
    }

    const equipmentData = {
      ...formData,
      parameterDefinitions: parameterDefinitions,
      parameters: parameterDefinitions.map(def => ({
        name: def.name,
        value: '',
        status: 'normal',
        type: def.type,
        unit: def.unit,
        lastUpdated: null
      }))
    };

    if (isAdding) { 
      const id = Math.max(0, ...equipment.map(e => e.id)) + 1; 
      setEquipment([...equipment, { id, ...equipmentData }]); 
      setIsAdding(false); 
    } else if (editingId) { 
      setEquipment(equipment.map(e => e.id === editingId ? { ...e, ...equipmentData } : e)); 
      setEditingId(null); 
    }
    
    setFormData({ 
      name: '', 
      type: 'chiller', 
      location: '', 
      serialNumber: '', 
      parameters: [],
      parameterDefinitions: []
    });
    setParameterDefinitions([]);
  };

  const handleCancel = () => { 
    setIsAdding(false); 
    setEditingId(null); 
    setFormData({ 
      name: '', 
      type: 'chiller', 
      location: '', 
      serialNumber: '', 
      parameters: [],
      parameterDefinitions: []
    }); 
    setParameterDefinitions([]);
  };

  // Load template parameters when machine type changes
  const handleTypeChange = (type) => {
    setFormData({ ...formData, type });
    if (parameterTemplates[type]) {
      setParameterDefinitions(parameterTemplates[type]);
    } else {
      setParameterDefinitions([]);
    }
  };

  // Parameter management functions
  const addParameter = () => {
    if (!newParameter.name.trim()) {
      alert('Parameter name is required');
      return;
    }

    const parameter = {
      ...newParameter,
      id: Date.now(),
      options: newParameter.type === 'dropdown' ? newParameter.options : []
    };

    setParameterDefinitions([...parameterDefinitions, parameter]);
    setNewParameter({
      name: '',
      type: 'text',
      unit: '',
      required: true,
      options: [],
      minValue: '',
      maxValue: '',
      description: ''
    });
  };

  const removeParameter = (paramId) => {
    setParameterDefinitions(parameterDefinitions.filter(p => p.id !== paramId));
  };

  const updateParameter = (paramId, field, value) => {
    setParameterDefinitions(parameterDefinitions.map(p => 
      p.id === paramId ? { ...p, [field]: value } : p
    ));
  };

  const showQr = (item) => { setQrTarget(item); setQrModalOpen(true); };
  const closeQr = () => { setQrModalOpen(false); setQrTarget(null); };
  const printQr = (item) => {
    const url = `${window.location.origin}/machines/${item.id}`;
    const img = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
    const w = window.open('','_blank'); if(!w) return alert('Allow popups to print'); w.document.write(`<html><body style="display:flex;flex-direction:column;align-items:center"><h2>${item.name}</h2><img src="${img}"/><script>setTimeout(()=>window.print(),300)</script></body></html>`); w.document.close();
  };

  // Service recording functions
  const startServiceRecording = (machine) => {
    setSelectedMachineForService(machine);
    setShowServiceRecording(true);
  };

  const closeServiceRecording = () => {
    setShowServiceRecording(false);
    setSelectedMachineForService(null);
  };

  // Service history functions
  const showServiceHistoryFor = (machine) => {
    setSelectedMachineForHistory(machine);
    setShowServiceHistory(true);
  };

  const closeServiceHistory = () => {
    setShowServiceHistory(false);
    setSelectedMachineForHistory(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Equipment Management</h1>
            <p className="text-gray-600 mt-2">
              Add and configure equipment with custom parameters for weekly service and maintenance recording
            </p>
          </div>
          <div className="space-x-2">
            <button 
              onClick={handleAdd} 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-flex items-center"
            >
              <FaPlus className="mr-2" />
              Add Equipment
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {(isAdding || editingId) && (
          <div className="bg-white rounded shadow p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">
              {isAdding ? 'Add New Equipment' : 'Edit Equipment'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Equipment Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Enter equipment name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Equipment Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="chiller">Industrial Chiller</option>
                  <option value="compressor">Air Compressor</option>
                  <option value="pump">Pump System</option>
                  <option value="hvac">HVAC Unit</option>
                  <option value="boiler">Boiler System</option>
                  <option value="generator">Generator</option>
                  <option value="fan">Industrial Fan</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Serial Number *
                </label>
                <input
                  type="text"
                  value={formData.serialNumber}
                  onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Enter serial number"
                />
              </div>
            </div>

            {/* Parameter Definitions Section */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-lg font-medium">Parameter Definitions</h4>
                  <p className="text-sm text-gray-600">
                    Define what parameters will be recorded during weekly service and maintenance
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => setShowParameterModal(true)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    <FaPlus className="inline mr-1" /> Add Parameter
                  </button>
                  {parameterTemplates[formData.type] && (
                    <button
                      onClick={() => setParameterDefinitions(parameterTemplates[formData.type])}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Load Template
                    </button>
                  )}
                </div>
              </div>

              {parameterTemplates[formData.type] && parameterDefinitions.length === 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Tip:</strong> We have a pre-defined template for {formData.type} equipment with {parameterTemplates[formData.type].length} common parameters. 
                    Click "Load Template" to use it as a starting point, then customize as needed.
                  </p>
                </div>
              )}

              {parameterDefinitions.length > 0 && (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {parameterDefinitions.map((param, index) => (
                    <div key={param.id || index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                      <div className="flex-1">
                        <div className="font-medium">{param.name}</div>
                        <div className="text-sm text-gray-600">
                          Type: {param.type} {param.unit && `• Unit: ${param.unit}`} 
                          {param.required && ' • Required'}
                        </div>
                        {param.description && (
                          <div className="text-xs text-gray-500 mt-1">{param.description}</div>
                        )}
                        {param.options && param.options.length > 0 && (
                          <div className="text-xs text-blue-600 mt-1">
                            Options: {param.options.join(', ')}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeParameter(param.id || index)}
                        className="text-red-600 hover:text-red-800 ml-2"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {parameterDefinitions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FaCog className="mx-auto text-3xl mb-2" />
                  <p>No parameters defined yet. Add parameters to specify what will be recorded during service.</p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {isAdding ? 'Add Equipment' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 text-left text-xs text-gray-600 uppercase"><tr>
              <th className="px-4 py-3">Name</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Location</th><th className="px-4 py-3">Serial</th><th className="px-4 py-3">Params</th><th className="px-4 py-3">Actions</th>
            </tr></thead>
            <tbody>
              {equipment.map(item=> (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3 capitalize">{item.type}</td>
                  <td className="px-4 py-3">{item.location}</td>
                  <td className="px-4 py-3 font-mono text-sm">{item.serialNumber}</td>
                  <td className="px-4 py-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {(item.parameterDefinitions?.length || item.parameters?.length || 0)} params
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      <button 
                        onClick={() => startServiceRecording(item)} 
                        className="bg-green-600 text-white hover:bg-green-700 px-2 py-1 text-sm rounded inline-flex items-center"
                        title="Record Service"
                      >
                        <FaClipboardList className="mr-1" />Service
                      </button>
                      <button 
                        onClick={() => showServiceHistoryFor(item)} 
                        className="bg-purple-600 text-white hover:bg-purple-700 px-2 py-1 text-sm rounded inline-flex items-center"
                        title="View Service History"
                      >
                        <FaHistory className="mr-1" />History
                      </button>
                      <button 
                        onClick={() => handleEdit(item)} 
                        className="text-blue-600 hover:text-blue-800 px-2 py-1 text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="text-red-600 hover:text-red-800 px-2 py-1 text-sm"
                      >
                        Delete
                      </button>
                      <button 
                        onClick={() => showQr(item)} 
                        className="text-gray-700 hover:text-gray-900 px-2 py-1 text-sm inline-flex items-center"
                      >
                        <FaQrcode className="mr-1" />QR
                      </button>
                      <button 
                        onClick={() => printQr(item)} 
                        className="text-gray-700 hover:text-gray-900 px-2 py-1 text-sm inline-flex items-center"
                      >
                        <FaPrint className="mr-1" />Print
                      </button>
                      <button 
                        onClick={() => { 
                          window.history.pushState({}, '', `/machines/${item.id}`); 
                          window.location.reload(); 
                        }} 
                        className="text-gray-700 hover:text-gray-900 px-2 py-1 text-sm inline-flex items-center"
                      >
                        <FaExternalLinkAlt className="mr-1" />Open
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {equipment.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                    No equipment added yet. Click "Add" to create your first equipment entry.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Parameter Definition Modal */}
        {showParameterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-semibold">Add Parameter Definition</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Define a parameter that will be recorded during service and maintenance
                  </p>
                </div>
                <button 
                  onClick={() => setShowParameterModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="bg-gray-50 border rounded p-3 mb-4">
                <h4 className="font-medium text-sm mb-2">Parameter Type Guide:</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <div><strong>Dropdown:</strong> For condition states (Excellent, Good, Poor, etc.)</div>
                  <div><strong>Current:</strong> For electrical measurements (Amperes, Voltage)</div>
                  <div><strong>Temperature:</strong> For temperature readings (°C, °F)</div>
                  <div><strong>Pressure:</strong> For pressure measurements (PSI, bar, kPa)</div>
                  <div><strong>Percentage:</strong> For levels and concentrations (%)</div>
                  <div><strong>Number:</strong> For general numeric values</div>
                  <div><strong>Yes/No:</strong> For binary conditions (On/Off, Pass/Fail)</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parameter Name *
                  </label>
                    <input
                      type="text"
                      value={newParameter.name}
                      onChange={(e) => setNewParameter({ ...newParameter, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      placeholder="e.g., Compressor Current Phase 1, Oil Level, Fan Blade Condition"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Input Type *
                    </label>
                    <select
                      value={newParameter.type}
                      onChange={(e) => setNewParameter({ ...newParameter, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    >
                      <option value="text">Text</option>
                      <option value="number">Number</option>
                      <option value="dropdown">Dropdown/Selection</option>
                      <option value="percentage">Percentage</option>
                      <option value="temperature">Temperature</option>
                      <option value="pressure">Pressure</option>
                      <option value="current">Current/Voltage</option>
                      <option value="boolean">Yes/No</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit
                    </label>
                    <input
                      type="text"
                      value={newParameter.unit}
                      onChange={(e) => setNewParameter({ ...newParameter, unit: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      placeholder="e.g., A, °C, bar, %, PSI"
                    />
                  </div>
                </div>

                {newParameter.type === 'dropdown' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dropdown Options (one per line)
                    </label>
                    <textarea
                      value={newParameter.options.join('\n')}
                      onChange={(e) => setNewParameter({ 
                        ...newParameter, 
                        options: e.target.value.split('\n').filter(opt => opt.trim() !== '') 
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      rows={4}
                      placeholder="Excellent&#10;Good&#10;Fair&#10;Poor&#10;Replace"
                    />
                  </div>
                )}

                {(newParameter.type === 'number' || newParameter.type === 'percentage' || 
                  newParameter.type === 'temperature' || newParameter.type === 'pressure' || 
                  newParameter.type === 'current') && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Minimum Value
                      </label>
                      <input
                        type="number"
                        value={newParameter.minValue}
                        onChange={(e) => setNewParameter({ ...newParameter, minValue: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Optional"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Maximum Value
                      </label>
                      <input
                        type="number"
                        value={newParameter.maxValue}
                        onChange={(e) => setNewParameter({ ...newParameter, maxValue: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newParameter.description}
                    onChange={(e) => setNewParameter({ ...newParameter, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    rows={2}
                    placeholder="Brief description of what this parameter measures or represents"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="required"
                    checked={newParameter.required}
                    onChange={(e) => setNewParameter({ ...newParameter, required: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="required" className="text-sm text-gray-700">
                    Required parameter (must be filled during service)
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                <button
                  onClick={() => setShowParameterModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    addParameter();
                    setShowParameterModal(false);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add Parameter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* QR Code Modal */}
        {qrModalOpen && qrTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white p-6 rounded shadow w-96">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{qrTarget.name}</h3>
                  <p className="text-sm text-gray-600">{qrTarget.location}</p>
                </div>
                <button onClick={closeQr} className="text-gray-500">✕</button>
              </div>
              <div className="flex flex-col items-center">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(window.location.origin + '/machines/' + qrTarget.id)}`} alt="QR" />
                <div className="mt-4 flex space-x-2">
                  <button onClick={()=>printQr(qrTarget)} className="px-3 py-1 bg-blue-600 text-white rounded">Print</button>
                  <button onClick={()=>{ navigator.clipboard && navigator.clipboard.writeText(window.location.origin + '/machines/' + qrTarget.id); }} className="px-3 py-1 bg-gray-100 rounded">Copy Link</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Service Recording Interface */}
        {showServiceRecording && selectedMachineForService && (
          <ServiceRecordingInterface
            machineId={selectedMachineForService.id}
            onClose={closeServiceRecording}
          />
        )}

        {/* Service History Viewer */}
        {showServiceHistory && selectedMachineForHistory && (
          <ServiceHistoryViewer
            machineId={selectedMachineForHistory.id}
            onClose={closeServiceHistory}
          />
        )}

      </div>
    </div>
  );
};

export default EquipmentManagementUI;
