import React, { useState, useEffect } from 'react';
import { FaClipboardList, FaTools, FaFilter, FaCalendarAlt, FaChevronDown, FaChevronUp, FaSpinner } from 'react-icons/fa';
import serviceHistoryData from '../data/serviceHistory.json';

const ServiceHistory = () => {
  const [serviceRecords, setServiceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterType, setFilterType] = useState('all');
  const [filterEquipment, setFilterEquipment] = useState('all');
  const [expandedRecords, setExpandedRecords] = useState([]);

  // Simulated API call to fetch service history
  useEffect(() => {
    const fetchServiceHistory = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Sort by date (newest first)
      const sortedData = serviceHistoryData.sort((a, b) => new Date(b.date) - new Date(a.date));
      setServiceRecords(sortedData);
      setLoading(false);
    };

    fetchServiceHistory();
  }, []);

  const toggleRecord = (recordId) => {
    if (expandedRecords.includes(recordId)) {
      setExpandedRecords(expandedRecords.filter(id => id !== recordId));
    } else {
      setExpandedRecords([...expandedRecords, recordId]);
    }
  };

  const uniqueEquipment = [...new Set(serviceRecords.map(r => r.equipmentName))];

  const filteredRecords = serviceRecords.filter(record => {
    const typeMatch = filterType === 'all' || record.serviceType === filterType;
    const equipmentMatch = filterEquipment === 'all' || record.equipmentName === filterEquipment;
    return typeMatch && equipmentMatch;
  });

  const getServiceTypeBadge = (type) => {
    switch(type) {
      case 'weekly':
        return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">Weekly Service</span>;
      case 'maintenance':
        return <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold">Maintenance</span>;
      case 'breakdown':
        return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">Breakdown</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">{type}</span>;
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <FaSpinner className="text-4xl text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-lg text-gray-600">Loading service history...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Service History</h1>
          <div className="text-sm text-gray-500">
            {serviceRecords.length} total records • Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex items-center space-x-4">
            <FaFilter className="text-gray-600" />
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Service Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="weekly">Weekly Service</option>
                <option value="maintenance">Maintenance</option>
                <option value="breakdown">Breakdown</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Equipment</label>
              <select
                value={filterEquipment}
                onChange={(e) => setFilterEquipment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Equipment</option>
                {uniqueEquipment.map((name, index) => (
                  <option key={index} value={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-semibold mb-1">Total Records</h3>
            <p className="text-2xl font-bold text-gray-800">{filteredRecords.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-semibold mb-1">Weekly Services</h3>
            <p className="text-2xl font-bold text-blue-600">
              {filteredRecords.filter(r => r.serviceType === 'weekly').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-semibold mb-1">Maintenance</h3>
            <p className="text-2xl font-bold text-orange-600">
              {filteredRecords.filter(r => r.serviceType === 'maintenance').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-semibold mb-1">Breakdowns</h3>
            <p className="text-2xl font-bold text-red-600">
              {filteredRecords.filter(r => r.serviceType === 'breakdown').length}
            </p>
          </div>
        </div>

        {/* Service Records */}
        <div className="space-y-4">
          {filteredRecords.map((record) => {
            const isExpanded = expandedRecords.includes(record.id);
            return (
              <div key={record.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Record Header */}
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => toggleRecord(record.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {record.serviceType === 'weekly' ? (
                          <FaClipboardList className="text-blue-600 text-xl" />
                        ) : (
                          <FaTools className="text-orange-600 text-xl" />
                        )}
                        <h3 className="text-lg font-semibold text-gray-800">{record.equipmentName}</h3>
                        {getServiceTypeBadge(record.serviceType)}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-2 text-gray-400" />
                          <span>{record.date}</span>
                        </div>
                        <div>
                          <strong>Technician:</strong> {record.technician}
                        </div>
                        <div>
                          <strong>Parameters:</strong> {Object.keys(record.readings).length} recorded
                        </div>
                        {record.duration && (
                          <div>
                            <strong>Duration:</strong> {record.duration}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      {isExpanded ? (
                        <FaChevronUp className="text-gray-400" />
                      ) : (
                        <FaChevronDown className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50">
                    {/* Readings */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-3">Recorded Readings</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Object.entries(record.readings).map(([param, value], index) => (
                          <div key={index} className="bg-white p-3 rounded border border-gray-200">
                            <p className="text-xs text-gray-500 mb-1">{param}</p>
                            <p className="font-semibold text-gray-800">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Work Performed (for maintenance and breakdown) */}
                    {(record.serviceType === 'maintenance' || record.serviceType === 'breakdown') && record.workPerformed && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Work Performed</h4>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="text-gray-700">{record.workPerformed}</p>
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {record.notes && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Notes</h4>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="text-gray-700">{record.notes}</p>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-4">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition">
                        View Full Report
                      </button>
                      <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300 transition">
                        Export PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredRecords.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No service records found for the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceHistory;
