import React, { useState, useEffect } from 'react';
import { FaHistory, FaClock, FaTools, FaUser, FaCalendar, FaExclamationTriangle, FaCheckCircle, FaTimes, FaSearch, FaFilter } from 'react-icons/fa';
import serviceHistoryData from '../data/serviceHistory.json';
import machinesData from '../data/machines.json';

const ServiceHistoryViewer = ({ machineId, onClose }) => {
  const [serviceRecords, setServiceRecords] = useState([]);
  const [machine, setMachine] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [filterType, setFilterType] = useState('all'); // 'all', 'weekly', 'maintenance'
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Find the machine
    const foundMachine = machinesData.find(m => m.id === parseInt(machineId));
    setMachine(foundMachine);

    // Filter service records for this machine
    let records = serviceHistoryData.filter(record => record.equipmentId === parseInt(machineId));
    
    // Apply type filter
    if (filterType !== 'all') {
      records = records.filter(record => record.serviceType === filterType);
    }

    // Apply search filter
    if (searchTerm) {
      records = records.filter(record => 
        record.technician.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.date.includes(searchTerm)
      );
    }

    // Sort by date (newest first)
    records.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    setServiceRecords(records);
  }, [machineId, filterType, searchTerm]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-600" />;
      case 'issues_found':
        return <FaExclamationTriangle className="text-yellow-600" />;
      default:
        return <FaClock className="text-gray-600" />;
    }
  };

  const getServiceTypeIcon = (type) => {
    return type === 'weekly' ? <FaClock className="text-blue-600" /> : <FaTools className="text-orange-600" />;
  };

  const getParameterStatusCount = (readings) => {
    // Since the serviceHistory.json doesn't have status info, we'll return default counts
    return { normal: Object.keys(readings).length, warning: 0, critical: 0 };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white w-full max-w-6xl mx-4 my-8 rounded-lg shadow-xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gray-800 text-white">
          <div className="flex items-center">
            <FaHistory className="text-2xl mr-3" />
            <div>
              <h2 className="text-xl font-bold">Service History</h2>
              <p className="text-gray-300">
                {machine.name} • {machine.location} • S/N: {machine.serialNumber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 text-xl"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6">
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Services</option>
                <option value="weekly">Weekly Services</option>
                <option value="maintenance">Maintenance/Repairs</option>
                <option value="breakdown">Breakdown/Emergency</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 flex-1">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search by technician, date, or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Service Records List */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {serviceRecords.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FaHistory className="text-4xl mx-auto mb-4 text-gray-300" />
                <p>No service records found for this equipment.</p>
                <p className="text-sm mt-1">Start recording services to build maintenance history.</p>
              </div>
            ) : (
              serviceRecords.map(record => {
                const statusCounts = getParameterStatusCount(record.readings || {});
                return (
                  <div
                    key={record.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedRecord(record)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-3">
                        {getServiceTypeIcon(record.serviceType)}
                        <div>
                          <h3 className="font-semibold capitalize">
                            {record.serviceType} Service
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <FaCalendar className="mr-1" />
                              {formatDate(record.date)}
                            </span>
                            <span className="flex items-center">
                              <FaUser className="mr-1" />
                              {record.technician}
                            </span>
                            <span className="flex items-center">
                              <FaClock className="mr-1" />
                              {record.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon('completed')}
                        <span className="text-sm text-gray-500">
                          {Object.keys(record.readings || {}).length} parameters
                        </span>
                      </div>
                    </div>

                    {/* Parameter Status Summary */}
                    <div className="flex items-center space-x-4 text-sm mb-2">
                      <span className="flex items-center text-green-600">
                        <FaCheckCircle className="mr-1" />
                        {statusCounts.normal} Recorded
                      </span>
                    </div>

                    {/* Work Performed */}
                    {record.workPerformed && record.workPerformed.trim() && (
                      <div className="mb-2">
                        <span className="text-sm text-blue-600 font-medium">
                          Maintenance Work Performed
                        </span>
                      </div>
                    )}

                    {/* Notes Preview */}
                    {record.notes && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {record.notes.length > 100 
                          ? `${record.notes.substring(0, 100)}...` 
                          : record.notes
                        }
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Detailed Record Modal */}
        {selectedRecord && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
            <div className="bg-white w-full max-w-4xl mx-4 my-8 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-xl font-semibold">
                  {selectedRecord.serviceType.charAt(0).toUpperCase() + selectedRecord.serviceType.slice(1)} Service Details
                </h3>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="p-6">
                {/* Service Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Date</label>
                    <p className="font-medium">{formatDate(selectedRecord.date)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Service Type</label>
                    <p className="font-medium capitalize">{selectedRecord.serviceType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Technician</label>
                    <p className="font-medium">{selectedRecord.technician}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Duration</label>
                    <p className="font-medium">{selectedRecord.duration}</p>
                  </div>
                </div>

                {/* Parameters */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">Parameter Readings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedRecord.readings || {}).map(([paramName, value]) => (
                      <div key={paramName} className="bg-gray-50 rounded p-3">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium">{paramName}</span>
                          <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">
                            Recorded
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-blue-600">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Work Performed */}
                {selectedRecord.workPerformed && selectedRecord.workPerformed.trim() && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">Work Performed</h4>
                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <p className="text-blue-800">{selectedRecord.workPerformed}</p>
                    </div>
                  </div>
                )}

                {/* Notes */}
                {selectedRecord.notes && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">Service Notes</h4>
                    <div className="bg-gray-50 rounded p-4">
                      <p className="text-gray-700 whitespace-pre-wrap">{selectedRecord.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceHistoryViewer;