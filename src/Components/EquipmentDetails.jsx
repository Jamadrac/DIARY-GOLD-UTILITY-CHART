import React, { useState } from 'react';
import { FaTemperatureHigh, FaTint, FaBolt, FaTachometerAlt, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EquipmentDetails = () => {
  const [selectedEquipment, setSelectedEquipment] = useState('chiller1');

  // Sample detailed equipment data
  const equipmentData = {
    chiller1: {
      name: 'Chiller Unit 1',
      type: 'chiller',
      status: 'operational',
      location: 'Building A - Basement',
      serialNumber: 'CH-2023-001',
      manufacturer: 'Carrier',
      model: 'AquaEdge 19DV',
      installedDate: '2023-01-15',
      warranty: 'Valid until 2026-01-15',
      metrics: {
        temperature: { value: 7.2, unit: '°C', status: 'normal', min: 5, max: 10 },
        waterLevel: { value: 85, unit: '%', status: 'normal', min: 70, max: 95 },
        glycolPercentage: { value: 35, unit: '%', status: 'normal', min: 30, max: 40 },
        current: { value: 245, unit: 'A', status: 'normal', min: 200, max: 300 },
        flowRate: { value: 450, unit: 'GPM', status: 'normal', min: 400, max: 500 },
        pressure: { value: 125, unit: 'PSI', status: 'normal', min: 100, max: 150 }
      },
      alerts: [
        { type: 'info', message: 'Scheduled maintenance in 7 days' }
      ],
      historyData: [
        { time: '00:00', temp: 7.2, current: 245, glycol: 35 },
        { time: '04:00', temp: 7.0, current: 248, glycol: 35 },
        { time: '08:00', temp: 7.3, current: 242, glycol: 36 },
        { time: '12:00', temp: 7.1, current: 246, glycol: 35 },
        { time: '16:00', temp: 7.4, current: 240, glycol: 36 },
        { time: '20:00', temp: 7.2, current: 244, glycol: 35 },
      ]
    },
    motor1: {
      name: 'Pump Motor M1',
      type: 'motor',
      status: 'warning',
      location: 'Pump Room - Floor 1',
      serialNumber: 'PM-2023-034',
      manufacturer: 'Siemens',
      model: '1LE1 Series',
      installedDate: '2023-03-20',
      warranty: 'Valid until 2025-03-20',
      metrics: {
        current: { value: 65, unit: 'A', status: 'warning', min: 50, max: 70 },
        voltage: { value: 380, unit: 'V', status: 'normal', min: 370, max: 400 },
        rpm: { value: 1450, unit: 'RPM', status: 'normal', min: 1400, max: 1500 },
        temperature: { value: 75, unit: '°C', status: 'warning', min: 40, max: 70 },
        powerFactor: { value: 0.85, unit: '', status: 'normal', min: 0.8, max: 1.0 },
        vibration: { value: 4.2, unit: 'mm/s', status: 'warning', min: 0, max: 4.5 }
      },
      alerts: [
        { type: 'warning', message: 'Temperature above normal range' },
        { type: 'warning', message: 'Vibration level increasing' }
      ],
      historyData: [
        { time: '00:00', current: 65, rpm: 1450, temp: 75 },
        { time: '04:00', current: 67, rpm: 1455, temp: 76 },
        { time: '08:00', current: 66, rpm: 1452, temp: 75 },
        { time: '12:00', current: 68, rpm: 1458, temp: 77 },
        { time: '16:00', current: 65, rpm: 1450, temp: 74 },
        { time: '20:00', current: 64, rpm: 1448, temp: 73 },
      ]
    }
  };

  const equipment = equipmentData[selectedEquipment];

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning': return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'critical': return 'bg-red-100 border-red-500 text-red-800';
      case 'info': return 'bg-blue-100 border-blue-500 text-blue-800';
      default: return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Equipment</label>
          <select
            value={selectedEquipment}
            onChange={(e) => setSelectedEquipment(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="chiller1">Chiller Unit 1</option>
            <option value="motor1">Pump Motor M1</option>
          </select>
        </div>

        {/* Equipment Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{equipment.name}</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Type</p>
                  <p className="font-semibold capitalize">{equipment.type}</p>
                </div>
                <div>
                  <p className="text-gray-500">Location</p>
                  <p className="font-semibold">{equipment.location}</p>
                </div>
                <div>
                  <p className="text-gray-500">Serial Number</p>
                  <p className="font-semibold">{equipment.serialNumber}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <p className={`font-semibold capitalize ${equipment.status === 'operational' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {equipment.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {equipment.alerts && equipment.alerts.length > 0 && (
          <div className="space-y-2 mb-6">
            {equipment.alerts.map((alert, index) => (
              <div key={index} className={`border-l-4 p-4 rounded ${getAlertColor(alert.type)}`}>
                <div className="flex items-center">
                  <FaExclamationTriangle className="mr-2" />
                  <span className="font-semibold">{alert.message}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {Object.entries(equipment.metrics).map(([key, metric]) => (
            <div key={key} className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
              metric.status === 'normal' ? 'border-green-500' : 
              metric.status === 'warning' ? 'border-yellow-500' : 'border-red-500'
            }`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-600 text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(metric.status)}`}>
                  {metric.status}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">
                {metric.value}{metric.unit}
              </p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Min: {metric.min}{metric.unit}</span>
                <span>Max: {metric.max}{metric.unit}</span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    metric.status === 'normal' ? 'bg-green-500' : 
                    metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{
                    width: `${Math.min(100, Math.max(0, ((metric.value - metric.min) / (metric.max - metric.min)) * 100))}%`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* 24-Hour History Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">24-Hour Performance History</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={equipment.historyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              {equipment.type === 'chiller' && (
                <>
                  <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2} name="Temperature (°C)" />
                  <Line yAxisId="right" type="monotone" dataKey="current" stroke="#10b981" strokeWidth={2} name="Current (A)" />
                  <Line yAxisId="right" type="monotone" dataKey="glycol" stroke="#8b5cf6" strokeWidth={2} name="Glycol %" />
                </>
              )}
              {equipment.type === 'motor' && (
                <>
                  <Line yAxisId="left" type="monotone" dataKey="current" stroke="#10b981" strokeWidth={2} name="Current (A)" />
                  <Line yAxisId="right" type="monotone" dataKey="rpm" stroke="#8b5cf6" strokeWidth={2} name="RPM" />
                  <Line yAxisId="right" type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} name="Temperature (°C)" />
                </>
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Equipment Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Equipment Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Manufacturer:</span>
                <span className="font-semibold">{equipment.manufacturer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Model:</span>
                <span className="font-semibold">{equipment.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Installed:</span>
                <span className="font-semibold">{equipment.installedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Warranty:</span>
                <span className="font-semibold">{equipment.warranty}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Schedule Maintenance
              </button>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                View Full History
              </button>
              <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition">
                Download Report
              </button>
              <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition">
                Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetails;
