import React, { useState } from 'react';
import { FaCalendarAlt, FaTools, FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';

const MaintenanceSchedule = () => {
  const [maintenanceRecords, setMaintenanceRecords] = useState([
    {
      id: 1,
      equipmentName: 'Chiller Unit 1',
      equipmentType: 'chiller',
      scheduledDate: '2024-11-18',
      status: 'upcoming',
      type: 'preventive',
      description: 'Routine filter cleaning and refrigerant check',
      lastCompleted: '2024-11-04',
      technician: 'John Smith'
    },
    {
      id: 2,
      equipmentName: 'Air Compressor A',
      equipmentType: 'compressor',
      scheduledDate: '2024-11-15',
      status: 'upcoming',
      type: 'preventive',
      description: 'Oil change and air filter replacement',
      lastCompleted: '2024-11-01',
      technician: 'Mike Johnson'
    },
    {
      id: 3,
      equipmentName: 'Genset 500KVA',
      equipmentType: 'genset',
      scheduledDate: '2024-11-11',
      status: 'due',
      type: 'inspection',
      description: 'Battery check, fuel system inspection',
      lastCompleted: '2024-10-28',
      technician: 'David Lee'
    },
    {
      id: 4,
      equipmentName: 'Central AC Unit 1',
      equipmentType: 'ac',
      scheduledDate: '2024-11-19',
      status: 'upcoming',
      type: 'preventive',
      description: 'Coil cleaning and thermostat calibration',
      lastCompleted: '2024-11-05',
      technician: 'Sarah Wilson'
    },
    {
      id: 5,
      equipmentName: 'Pump Motor M1',
      equipmentType: 'motor',
      scheduledDate: '2024-11-13',
      status: 'overdue',
      type: 'repair',
      description: 'Bearing inspection and lubrication',
      lastCompleted: '2024-10-20',
      technician: 'Tom Anderson'
    },
    {
      id: 6,
      equipmentName: 'Chiller Unit 2',
      equipmentType: 'chiller',
      scheduledDate: '2024-11-09',
      status: 'completed',
      type: 'repair',
      description: 'Compressor replacement',
      lastCompleted: '2024-11-09',
      technician: 'John Smith'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const getStatusBadge = (status) => {
    const badges = {
      completed: { color: 'bg-green-100 text-green-800', icon: <FaCheckCircle /> },
      upcoming: { color: 'bg-blue-100 text-blue-800', icon: <FaClock /> },
      due: { color: 'bg-yellow-100 text-yellow-800', icon: <FaExclamationCircle /> },
      overdue: { color: 'bg-red-100 text-red-800', icon: <FaExclamationCircle /> }
    };
    return badges[status] || badges.upcoming;
  };

  const getTypeBadge = (type) => {
    const colors = {
      preventive: 'bg-purple-100 text-purple-800',
      repair: 'bg-orange-100 text-orange-800',
      inspection: 'bg-cyan-100 text-cyan-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const filteredRecords = filter === 'all' 
    ? maintenanceRecords 
    : maintenanceRecords.filter(record => record.status === filter);

  const stats = {
    total: maintenanceRecords.length,
    upcoming: maintenanceRecords.filter(r => r.status === 'upcoming').length,
    due: maintenanceRecords.filter(r => r.status === 'due').length,
    overdue: maintenanceRecords.filter(r => r.status === 'overdue').length,
    completed: maintenanceRecords.filter(r => r.status === 'completed').length
  };

  const handleStatusUpdate = (id, newStatus) => {
    setMaintenanceRecords(maintenanceRecords.map(record => 
      record.id === id ? { ...record, status: newStatus, lastCompleted: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : record.lastCompleted } : record
    ));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Maintenance Schedule</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition">
            <FaCalendarAlt /> <span>Schedule Maintenance</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-xs font-semibold mb-1">Total Tasks</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-xs font-semibold mb-1">Upcoming</h3>
            <p className="text-2xl font-bold text-blue-600">{stats.upcoming}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-xs font-semibold mb-1">Due Today</h3>
            <p className="text-2xl font-bold text-yellow-600">{stats.due}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-xs font-semibold mb-1">Overdue</h3>
            <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-xs font-semibold mb-1">Completed</h3>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded-lg ${filter === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('due')}
              className={`px-4 py-2 rounded-lg ${filter === 'due' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Due Today
            </button>
            <button
              onClick={() => setFilter('overdue')}
              className={`px-4 py-2 rounded-lg ${filter === 'overdue' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Overdue
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg ${filter === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Maintenance Records */}
        <div className="space-y-4">
          {filteredRecords.map((record) => {
            const statusBadge = getStatusBadge(record.status);
            return (
              <div key={record.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <FaTools className="text-gray-600 text-xl" />
                      <h3 className="text-xl font-semibold text-gray-800">{record.equipmentName}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{record.description}</p>
                    <div className="flex space-x-2">
                      <span className={`${statusBadge.color} px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1`}>
                        {statusBadge.icon}
                        <span className="ml-1 capitalize">{record.status}</span>
                      </span>
                      <span className={`${getTypeBadge(record.type)} px-3 py-1 rounded-full text-xs font-semibold capitalize`}>
                        {record.type}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Scheduled Date</p>
                    <p className="text-lg font-semibold text-gray-800 flex items-center">
                      <FaCalendarAlt className="mr-2" />
                      {record.scheduledDate}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <p><strong>Technician:</strong> {record.technician}</p>
                    <p><strong>Last Completed:</strong> {record.lastCompleted}</p>
                  </div>
                  <div className="space-x-2">
                    {record.status !== 'completed' && (
                      <button
                        onClick={() => handleStatusUpdate(record.id, 'completed')}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                      >
                        Mark Complete
                      </button>
                    )}
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRecords.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No maintenance records found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenanceSchedule;
