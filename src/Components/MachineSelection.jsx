import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import machinesData from '../data/machines.json';

const MachineSelection = () => {
  const { user, canRecordDailyLog } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  if (!canRecordDailyLog()) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Access Denied: You don't have permission to record machine data.
          </div>
        </div>
      </div>
    );
  }

  const handleMachineSelect = (machineId) => {
    // Update URL and navigate to recording screen
    window.history.pushState(null, null, `/record/${machineId}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // Filter machines based on search and filters
  const filteredMachines = machinesData.filter(machine => {
    const matchesSearch = machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         machine.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         machine.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || machine.type === filterType;
    const matchesStatus = filterStatus === 'all' || machine.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Get unique types for filter dropdown
  const uniqueTypes = [...new Set(machinesData.map(m => m.type))];
  
  // Get unique statuses for filter dropdown
  const uniqueStatuses = [...new Set(machinesData.map(m => m.status))];

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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Select Machine for Recording</h1>
          <p className="text-gray-600">Choose a machine to record daily readings and parameters</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Machines
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Search by name, location, or serial number..."
              />
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                {uniqueStatuses.map(status => (
                  <option key={status} value={status}>
                    {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredMachines.length} of {machinesData.length} machines
          </p>
        </div>

        {/* Machine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMachines.map(machine => (
            <div
              key={machine.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-300"
              onClick={() => handleMachineSelect(machine.id)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getTypeIcon(machine.type)}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{machine.name}</h3>
                      <p className="text-sm text-gray-500">{machine.serialNumber}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(machine.status)}`}>
                    {machine.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Location:</span>
                    <span className="text-sm font-medium text-gray-900">{machine.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Type:</span>
                    <span className="text-sm font-medium text-gray-900 capitalize">{machine.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Parameters:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {machine.parameterDefinitions.length} recordable
                    </span>
                  </div>
                </div>

                {/* Service Info */}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Last Service: {new Date(machine.lastService).toLocaleDateString()}</span>
                    <span>Next Service: {new Date(machine.nextService).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Record Parameters →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredMachines.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-400 text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No machines found</h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or filters to find machines.
            </p>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default MachineSelection;