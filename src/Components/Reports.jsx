import React, { useState } from 'react';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('30days');

  const reportTypes = [
    { id: 'overview', name: 'Equipment Overview', icon: '📊' },
    { id: 'performance-metrics', name: 'Performance Metrics', icon: '⚡' },
    { id: 'maintenance-summary', name: 'Maintenance Summary', icon: '🔧' },
    { id: 'service-records', name: 'Service Records', icon: '📋' },
    { id: 'downtime-analysis', name: 'Downtime Analysis', icon: '�' },
    { id: 'cost-analysis', name: 'Cost Analysis', icon: '💰' }
  ];

  const mockData = {
    overview: {
      totalEquipment: 6,
      operational: 4,
      avgUptime: 94.5,
      healthScore: 82,
      pendingMaintenance: 3,
      totalCost: 125000
    },
    performanceMetrics: [
      { equipment: 'Industrial Chiller 1', uptime: 96.5, efficiency: 88, powerUsage: 245, status: 'Excellent' },
      { equipment: 'Air Compressor A', uptime: 94.2, efficiency: 85, powerUsage: 180, status: 'Good' },
      { equipment: 'Genset 500KVA', uptime: 99.8, efficiency: 92, powerUsage: 0, status: 'Excellent' },
      { equipment: 'Central AC Unit 1', uptime: 91.5, efficiency: 82, powerUsage: 95, status: 'Good' },
      { equipment: 'Pump Motor M1', uptime: 87.3, efficiency: 78, powerUsage: 65, status: 'Average' }
    ],
    maintenanceTrends: [
      { month: 'Aug', scheduled: 8, completed: 8, emergency: 1, cost: 12000 },
      { month: 'Sep', scheduled: 9, completed: 8, emergency: 2, cost: 15000 },
      { month: 'Oct', scheduled: 10, completed: 9, emergency: 1, cost: 11000 },
      { month: 'Nov', scheduled: 8, completed: 6, emergency: 0, cost: 9000 }
    ],
    serviceRecords: [
      { equipment: 'Industrial Chiller 1', type: 'Weekly Service', date: '2024-11-09', technician: 'John Smith', duration: '2.5 hrs' },
      { equipment: 'Air Compressor A', type: 'Maintenance', date: '2024-11-08', technician: 'Mike Johnson', duration: '3 hrs' },
      { equipment: 'Pump Motor M1', type: 'Maintenance', date: '2024-11-05', technician: 'Tom Anderson', duration: '4 hrs' }
    ],
    downtimeIncidents: [
      { equipment: 'Pump Motor M1', reason: 'Bearing failure', duration: '6 hrs', date: '2024-10-28', cost: 8500 },
      { equipment: 'Air Compressor A', reason: 'Oil leak', duration: '3 hrs', date: '2024-10-15', cost: 2300 },
      { equipment: 'Central AC Unit 1', reason: 'Filter replacement', duration: '1.5 hrs', date: '2024-10-10', cost: 450 }
    ]
  };

  const generatePDF = () => {
    // Simulate PDF generation
    alert('PDF report generated successfully!');
  };

  const exportData = () => {
    // Simulate data export
    alert('Data exported to CSV successfully!');
  };

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Average Uptime</h3>
          <p className="text-3xl font-bold text-green-900">{mockData.overview.avgUptime}%</p>
          <p className="text-green-600">Across all equipment</p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Equipment Health</h3>
          <p className="text-3xl font-bold text-blue-900">{mockData.overview.healthScore}/100</p>
          <p className="text-blue-600">Overall health score</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">Maintenance Cost</h3>
          <p className="text-3xl font-bold text-purple-900">${(mockData.overview.totalCost / 1000).toFixed(0)}K</p>
          <p className="text-purple-600">Total maintenance spend</p>
        </div>
      </div>

      {/* Equipment Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">Total Equipment</p>
          <p className="text-2xl font-bold text-gray-800">{mockData.overview.totalEquipment}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">Operational</p>
          <p className="text-2xl font-bold text-blue-600">{mockData.overview.operational}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
          <p className="text-gray-600 text-sm">Pending Maintenance</p>
          <p className="text-2xl font-bold text-yellow-600">{mockData.overview.pendingMaintenance}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
          <p className="text-gray-600 text-sm">Under Maintenance</p>
          <p className="text-2xl font-bold text-red-600">{mockData.overview.totalEquipment - mockData.overview.operational}</p>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Equipment Status Distribution</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p>Pie chart showing equipment status</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Monthly Uptime Trends</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              <p>Line chart showing uptime trends</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformanceMetricsReport = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Equipment Performance Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uptime %</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency %</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Power (A)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockData.performanceMetrics.map((equip, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{equip.equipment}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{equip.uptime}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${equip.efficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{equip.efficiency}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{equip.powerUsage}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      equip.status === 'Excellent' ? 'bg-green-100 text-green-800' :
                      equip.status === 'Good' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {equip.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Efficiency Comparison</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center text-gray-500">
            <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p>Bar chart comparing equipment efficiency</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMaintenanceSummaryReport = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Maintenance Trends</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emergency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost ($)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockData.maintenanceTrends.map((data, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{data.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{data.scheduled}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-green-600 font-semibold">{data.completed}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      data.emergency === 0 ? 'bg-green-100 text-green-800' :
                      data.emergency === 1 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {data.emergency}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">${data.cost.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Maintenance Cost Trend</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center text-gray-500">
            <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            <p>Line chart showing maintenance cost trends</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServiceRecordsReport = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Service Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockData.serviceRecords.map((record, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{record.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{record.equipment}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      record.type === 'Weekly Service' ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {record.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{record.technician}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{record.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Service Type Distribution</h3>
          <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p>Service type breakdown chart</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Technician Performance</h3>
          <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Average service time by technician</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDowntimeAnalysisReport = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Downtime Incidents</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockData.downtimeIncidents.map((incident, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{incident.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{incident.equipment}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{incident.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-red-600 font-semibold">{incident.duration}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">${incident.cost.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Downtime by Equipment</h3>
          <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p>Downtime hours by equipment</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Downtime Causes</h3>
          <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Root cause analysis chart</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCostAnalysisReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Total Maintenance Cost</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">$125,000</p>
          <p className="text-sm text-blue-600 mt-2">Last 12 months</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Parts Cost</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">$68,000</p>
          <p className="text-sm text-gray-600 mt-2">54% of total</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Labor Cost</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">$42,000</p>
          <p className="text-sm text-gray-600 mt-2">34% of total</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Downtime Cost</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">$15,000</p>
          <p className="text-sm text-red-600 mt-2">Production loss</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Cost by Equipment</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p>Maintenance cost per equipment</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Cost Trend</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Monthly cost trend chart</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Top Cost Drivers</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span className="font-medium">Chiller Compressor Replacement</span>
            <span className="text-red-600 font-semibold">$28,500</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span className="font-medium">Air Compressor Motor Repair</span>
            <span className="text-red-600 font-semibold">$15,200</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span className="font-medium">Genset Scheduled Maintenance</span>
            <span className="text-orange-600 font-semibold">$12,800</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'overview':
        return renderOverviewReport();
      case 'performance-metrics':
        return renderPerformanceMetricsReport();
      case 'maintenance-summary':
        return renderMaintenanceSummaryReport();
      case 'service-records':
        return renderServiceRecordsReport();
      case 'downtime-analysis':
        return renderDowntimeAnalysisReport();
      case 'cost-analysis':
        return renderCostAnalysisReport();
      default:
        return renderOverviewReport();
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
            <p className="text-gray-600">
              Comprehensive reports and insights about your equipment performance
            </p>
          </div>
          
          <div className="flex space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 3 months</option>
              <option value="1year">Last year</option>
            </select>
            
            <button
              onClick={exportData}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Export Data
            </button>
            
            <button
              onClick={generatePDF}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Generate PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Report Types Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">Report Types</h2>
              <nav className="space-y-2">
                {reportTypes.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report.id)}
                    className={`w-full text-left p-3 rounded-md transition-colors ${
                      selectedReport === report.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-lg">{report.icon}</span>
                      <span className="font-medium">{report.name}</span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-4 mt-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Equipment</span>
                  <span className="font-semibold">{mockData.totalEquipment}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Operational</span>
                  <span className="font-semibold text-green-600">{mockData.operational}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg Uptime</span>
                  <span className="font-semibold">{mockData.avgUptime}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Maintenance Due</span>
                  <span className="font-semibold text-orange-600">{mockData.totalEquipment - mockData.operational}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Report Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {reportTypes.find(r => r.id === selectedReport)?.name}
                </h2>
                <span className="text-sm text-gray-500">
                  Generated on {new Date().toLocaleDateString()}
                </span>
              </div>
              
              {renderReportContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;