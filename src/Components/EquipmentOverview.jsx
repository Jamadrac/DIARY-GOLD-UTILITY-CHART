import React, { useState } from 'react';
import { FaTemperatureHigh, FaWind, FaBolt, FaFan, FaTools, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

const EquipmentOverview = () => {
  const [equipment] = useState([
    {
      id: 1,
      name: 'Chiller Unit 1',
      type: 'chiller',
      status: 'operational',
      temperature: 7.2,
      waterLevel: 85,
      glycolPercentage: 35,
      current: 245,
      lastMaintenance: '2024-11-04',
      nextMaintenance: '2024-11-18'
    },
    {
      id: 2,
      name: 'Air Compressor A',
      type: 'compressor',
      status: 'operational',
      pressure: 8.5,
      temperature: 68,
      current: 180,
      motorRPM: 1750,
      lastMaintenance: '2024-11-01',
      nextMaintenance: '2024-11-15'
    },
    {
      id: 3,
      name: 'Genset 500KVA',
      type: 'genset',
      status: 'standby',
      voltage: 415,
      frequency: 50,
      current: 0,
      fuelLevel: 78,
      lastMaintenance: '2024-10-28',
      nextMaintenance: '2024-11-11'
    },
    {
      id: 4,
      name: 'Central AC Unit 1',
      type: 'ac',
      status: 'operational',
      temperature: 22,
      humidity: 45,
      current: 95,
      airflow: 2400,
      lastMaintenance: '2024-11-05',
      nextMaintenance: '2024-11-19'
    },
    {
      id: 5,
      name: 'Pump Motor M1',
      type: 'motor',
      status: 'warning',
      current: 65,
      voltage: 380,
      rpm: 1450,
      temperature: 75,
      lastMaintenance: '2024-10-20',
      nextMaintenance: '2024-11-13'
    },
    {
      id: 6,
      name: 'Chiller Unit 2',
      type: 'chiller',
      status: 'maintenance',
      temperature: 0,
      waterLevel: 45,
      glycolPercentage: 38,
      current: 0,
      lastMaintenance: '2024-11-09',
      nextMaintenance: '2024-11-23'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'maintenance': return 'bg-orange-500';
      case 'standby': return 'bg-blue-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return <FaCheckCircle />;
      case 'warning': return <FaExclamationTriangle />;
      case 'maintenance': return <FaTools />;
      case 'standby': return <FaCheckCircle />;
      case 'error': return <FaTimesCircle />;
      default: return <FaCheckCircle />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'chiller': return <FaTemperatureHigh className="text-3xl text-blue-500" />;
      case 'compressor': return <FaWind className="text-3xl text-cyan-500" />;
      case 'genset': return <FaBolt className="text-3xl text-yellow-500" />;
      case 'ac': return <FaFan className="text-3xl text-green-500" />;
      case 'motor': return <FaBolt className="text-3xl text-purple-500" />;
      default: return <FaTools className="text-3xl text-gray-500" />;
    }
  };

  const stats = {
    total: equipment.length,
    operational: equipment.filter(e => e.status === 'operational').length,
    warning: equipment.filter(e => e.status === 'warning').length,
    maintenance: equipment.filter(e => e.status === 'maintenance').length
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Equipment Overview</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-semibold mb-2">Total Equipment</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-semibold mb-2">Operational</h3>
            <p className="text-3xl font-bold text-green-600">{stats.operational}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-semibold mb-2">Warnings</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.warning}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-semibold mb-2">Under Maintenance</h3>
            <p className="text-3xl font-bold text-orange-600">{stats.maintenance}</p>
          </div>
        </div>

        {/* Equipment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipment.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getTypeIcon(item.type)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                  </div>
                </div>
                <span className={`${getStatusColor(item.status)} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1`}>
                  {getStatusIcon(item.status)}
                  <span className="ml-1 capitalize">{item.status}</span>
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {item.type === 'chiller' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Temperature:</span>
                      <span className="font-semibold">{item.temperature}°C</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Water Level:</span>
                      <span className="font-semibold">{item.waterLevel}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Glycol:</span>
                      <span className="font-semibold">{item.glycolPercentage}%</span>
                    </div>
                  </>
                )}
                {item.type === 'compressor' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pressure:</span>
                      <span className="font-semibold">{item.pressure} bar</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Temperature:</span>
                      <span className="font-semibold">{item.temperature}°C</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Motor RPM:</span>
                      <span className="font-semibold">{item.motorRPM}</span>
                    </div>
                  </>
                )}
                {item.type === 'genset' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Voltage:</span>
                      <span className="font-semibold">{item.voltage}V</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Frequency:</span>
                      <span className="font-semibold">{item.frequency} Hz</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Fuel Level:</span>
                      <span className="font-semibold">{item.fuelLevel}%</span>
                    </div>
                  </>
                )}
                {item.type === 'ac' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Temperature:</span>
                      <span className="font-semibold">{item.temperature}°C</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Humidity:</span>
                      <span className="font-semibold">{item.humidity}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Airflow:</span>
                      <span className="font-semibold">{item.airflow} CFM</span>
                    </div>
                  </>
                )}
                {item.type === 'motor' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Voltage:</span>
                      <span className="font-semibold">{item.voltage}V</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">RPM:</span>
                      <span className="font-semibold">{item.rpm}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Temperature:</span>
                      <span className="font-semibold">{item.temperature}°C</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current:</span>
                  <span className="font-semibold">{item.current}A</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Last Service: {item.lastMaintenance}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Next Service: {item.nextMaintenance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EquipmentOverview;
