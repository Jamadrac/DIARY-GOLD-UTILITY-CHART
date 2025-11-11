import React, { useState, useEffect } from 'react';
import { FaChartLine, FaTachometerAlt, FaBolt, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  Area,
  AreaChart
} from 'recharts';
import serviceHistoryData from '../data/serviceHistory.json';
import machinesData from '../data/machines.json';

const PerformanceGraphs = () => {
  // default to first machine id if available to keep type consistent (number)
  const [selectedEquipment, setSelectedEquipment] = useState(machinesData[0]?.id || 1);
  const [timeRange, setTimeRange] = useState('week');
  const [chartData, setChartData] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);

  useEffect(() => {
    // Get available equipment from machines data
    setEquipmentList(machinesData);
  }, []);

  useEffect(() => {
    // Process service history data for the selected equipment
    const processServiceData = () => {
      const equipmentRecords = serviceHistoryData
        .filter(record => record.equipmentId === Number(selectedEquipment))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      // Convert service records to chart data
      const processedData = equipmentRecords.map(record => {
        const date = new Date(record.date);
        const chartPoint = {
          date: record.date,
          formattedDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          serviceType: record.serviceType,
        };

        // Extract numeric values from readings for charting and normalize keys
        if (record.readings) {
          const normalizeParamKey = (rawKey) => {
            const k = rawKey.toString().toLowerCase();
            if (k.includes('temperature') || k.includes('temp')) return 'temperature';
            if (k.includes('pressure')) return 'pressure';
            if (k.includes('current') && !k.includes('compressorcurrent') && !k.includes('motocurrent')) return 'current';
            if (k.includes('compressor current')) return 'current';
            if (k.includes('rpm') || k.includes('fan speed') || k.includes('speed')) return 'rpm';
            if (k.includes('voltage')) return 'voltage';
            if (k.includes('frequency')) return 'frequency';
            if (k.includes('load')) return 'load';
            if (k.includes('fuel') || k.includes('fuellevel') || k.includes('fuel level')) return 'fuelLevel';
            if (k.includes('flow') && k.includes('rate')) return 'flowRate';
            if (k.includes('flow')) return 'flow';
            // fallback: remove spaces and use lowercase
            return rawKey.toLowerCase().replace(/\s+/g, '');
          };

          Object.entries(record.readings).forEach(([key, value]) => {
            // Try to extract numeric values from strings like "18.2°C", "4.3 bar", etc.
            const numericValue = parseFloat(value.toString().replace(/[^\d.-]/g, ''));
            const normalized = normalizeParamKey(key);

            if (!isNaN(numericValue)) {
              chartPoint[normalized] = numericValue;
            }
          });
        }

        return chartPoint;
      });

      setChartData(processedData);
    };

    if (selectedEquipment) {
      processServiceData();
    }
  }, [selectedEquipment, timeRange]);

  const getSelectedEquipmentInfo = () => {
    return equipmentList.find(eq => eq.id === Number(selectedEquipment));
  };

  const getParametersForChart = () => {
    if (chartData.length === 0) return [];
    
    // Get all numeric parameters from the first data point
    const sampleData = chartData[0];
    const parameters = Object.keys(sampleData).filter(key => 
      key !== 'date' && key !== 'formattedDate' && key !== 'serviceType' && 
      typeof sampleData[key] === 'number'
    );
    
    return parameters;
  };

  // Fallback sample data used when there are no service records for the selected equipment
  const sampleData = [
    { time: 'Mon', pressure: 3.2, temperature: 75, rpm: 1450, current: 12, voltage: 230, frequency: 50, load: 10, fuelLevel: 80 },
    { time: 'Tue', pressure: 3.0, temperature: 76, rpm: 1470, current: 11.8, voltage: 231, frequency: 50, load: 12, fuelLevel: 78 },
    { time: 'Wed', pressure: 3.1, temperature: 74, rpm: 1460, current: 12.1, voltage: 229, frequency: 50, load: 11, fuelLevel: 77 },
    { time: 'Thu', pressure: 3.3, temperature: 75, rpm: 1480, current: 12.3, voltage: 232, frequency: 50, load: 13, fuelLevel: 75 },
    { time: 'Fri', pressure: 3.2, temperature: 76, rpm: 1455, current: 12.0, voltage: 230, frequency: 50, load: 9, fuelLevel: 74 }
  ];

  // Map processed chartData to chart-friendly objects. Ensure a `time` key exists for X axis.
  // Map processed chartData to chart-friendly objects. Ensure a `time` key exists for X axis.
  const data = (chartData && chartData.length > 0)
    ? chartData.map(pt => ({ time: pt.formattedDate || pt.date, ...pt }))
    : sampleData;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Performance Analytics</h1>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Equipment</label>
            <select
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {equipmentList.map(equipment => (
                <option key={equipment.id} value={equipment.id}>
                  {equipment.name} - {equipment.location}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="day">Last 24 Hours</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
          </div>
        </div>

        {/* Equipment Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Performance Analytics - {getSelectedEquipmentInfo()?.name || 'Equipment'}
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FaChartLine />
              <span>Real-time monitoring</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[
              { time: 'Mon', temperature: 7.2, current: 245, glycol: 35 },
              { time: 'Tue', temperature: 7.0, current: 248, glycol: 35 },
              { time: 'Wed', temperature: 7.3, current: 242, glycol: 36 },
              { time: 'Thu', temperature: 7.1, current: 246, glycol: 35 },
              { time: 'Fri', temperature: 7.4, current: 240, glycol: 36 },
              { time: 'Sat', temperature: 7.2, current: 244, glycol: 35 },
              { time: 'Sun', temperature: 7.0, current: 247, glycol: 35 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#3b82f6" strokeWidth={2} name="Temperature" />
              <Line type="monotone" dataKey="current" stroke="#10b981" strokeWidth={2} name="Current" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Additional Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Pressure & Temperature</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="pressure" stroke="#3b82f6" strokeWidth={2} name="Pressure (bar)" />
                  <Line yAxisId="right" type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2} name="Temperature (°C)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Motor RPM</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="rpm" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="RPM" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Current Draw</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" fill="#10b981" name="Current (A)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
        </div>

        {/* Charts for Genset */}
  {getSelectedEquipmentInfo()?.type === 'genset' && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Voltage & Frequency</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="voltage" stroke="#f59e0b" strokeWidth={2} name="Voltage (V)" />
                  <Line yAxisId="right" type="monotone" dataKey="frequency" stroke="#3b82f6" strokeWidth={2} name="Frequency (Hz)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Load Profile</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="load" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Load (kW)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Fuel Level</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="fuelLevel" stroke="#ef4444" strokeWidth={2} name="Fuel Level %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* Charts for Motor */}
  {getSelectedEquipmentInfo()?.type === 'motor' && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Voltage & Current</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="voltage" stroke="#3b82f6" strokeWidth={2} name="Voltage (V)" />
                  <Line yAxisId="right" type="monotone" dataKey="current" stroke="#10b981" strokeWidth={2} name="Current (A)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Motor Speed (RPM)</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="rpm" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="RPM" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Temperature</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="temperature" fill="#ef4444" name="Temperature (°C)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PerformanceGraphs;
