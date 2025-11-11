import React, { useState } from 'react';

const SoilHealthManagement = () => {
  const [soilTestData, setSoilTestData] = useState({
    pH: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    organicMatter: '',
    moisture: '',
    temperature: '',
    location: ''
  });

  const [soilAnalysis, setSoilAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('input');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSoilTestData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const analyzeSoilHealth = async () => {
    setIsAnalyzing(true);
    
    // Simulate soil analysis
    setTimeout(() => {
      const mockAnalysis = {
        overallHealth: 'Good',
        healthScore: 78,
        parameters: {
          pH: {
            value: parseFloat(soilTestData.pH) || 6.5,
            status: 'Optimal',
            recommendation: 'pH level is within the ideal range for most crops'
          },
          nitrogen: {
            value: parseFloat(soilTestData.nitrogen) || 45,
            status: 'Moderate',
            recommendation: 'Consider adding organic compost to increase nitrogen levels'
          },
          phosphorus: {
            value: parseFloat(soilTestData.phosphorus) || 32,
            status: 'Good',
            recommendation: 'Phosphorus levels are adequate for current crops'
          },
          potassium: {
            value: parseFloat(soilTestData.potassium) || 28,
            status: 'Low',
            recommendation: 'Apply potash fertilizer before next planting season'
          },
          organicMatter: {
            value: parseFloat(soilTestData.organicMatter) || 3.2,
            status: 'Good',
            recommendation: 'Maintain current organic matter levels with regular compost addition'
          }
        },
        deficiencies: [
          {
            nutrient: 'Potassium',
            severity: 'Moderate',
            solution: 'Apply 50 kg/hectare of muriate of potash',
            timing: 'Before planting'
          },
          {
            nutrient: 'Micronutrients',
            severity: 'Low',
            solution: 'Apply micronutrient mix spray',
            timing: 'During vegetative growth'
          }
        ],
        recommendations: [
          'Increase organic matter through compost application',
          'Test soil moisture regularly during growing season',
          'Consider crop rotation with legumes to fix nitrogen',
          'Apply lime if pH drops below 6.0',
          'Monitor soil temperature for optimal planting times'
        ],
        treatmentPlan: {
          immediate: [
            'Apply 2 tons/hectare of well-decomposed farmyard manure',
            'Add 50 kg/hectare muriate of potash'
          ],
          shortTerm: [
            'Plant nitrogen-fixing crops in rotation',
            'Regular soil moisture monitoring'
          ],
          longTerm: [
            'Implement sustainable farming practices',
            'Annual soil testing and health monitoring'
          ]
        }
      };
      
      setSoilAnalysis(mockAnalysis);
      setActiveTab('results');
      setIsAnalyzing(false);
    }, 2000);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'optimal':
      case 'good':
        return 'text-green-600 bg-green-100';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
      case 'poor':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Soil Health Management</h1>
          <p className="text-gray-600">
            Monitor and manage your soil health with AI-powered analysis and recommendations
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('input')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'input'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Soil Test Input
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'results'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Analysis Results
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                History & Trends
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'input' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Soil Test Parameters</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={soilTestData.location}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="e.g., North Field, Block A"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      pH Level
                    </label>
                    <input
                      type="number"
                      name="pH"
                      value={soilTestData.pH}
                      onChange={handleInputChange}
                      step="0.1"
                      min="0"
                      max="14"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="6.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Moisture %
                    </label>
                    <input
                      type="number"
                      name="moisture"
                      value={soilTestData.moisture}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="25"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nitrogen (kg/ha)
                    </label>
                    <input
                      type="number"
                      name="nitrogen"
                      value={soilTestData.nitrogen}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="45"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phosphorus (kg/ha)
                    </label>
                    <input
                      type="number"
                      name="phosphorus"
                      value={soilTestData.phosphorus}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="32"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Potassium (kg/ha)
                    </label>
                    <input
                      type="number"
                      name="potassium"
                      value={soilTestData.potassium}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="28"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organic Matter %
                    </label>
                    <input
                      type="number"
                      name="organicMatter"
                      value={soilTestData.organicMatter}
                      onChange={handleInputChange}
                      step="0.1"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="3.2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Temperature (°C)
                    </label>
                    <input
                      type="number"
                      name="temperature"
                      value={soilTestData.temperature}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="25"
                    />
                  </div>
                </div>

                <button
                  onClick={analyzeSoilHealth}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 px-4 rounded-md hover:from-yellow-600 hover:to-yellow-700 transition-all disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing Soil...
                    </div>
                  ) : (
                    'Analyze Soil Health'
                  )}
                </button>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Soil Testing Tips</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900">Best Time to Test</h4>
                    <p className="text-gray-600 text-sm">Test soil 2-3 weeks before planting season for accurate results.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900">Sampling Location</h4>
                    <p className="text-gray-600 text-sm">Take samples from multiple spots in the field for better accuracy.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900">Sample Depth</h4>
                    <p className="text-gray-600 text-sm">Collect samples from 0-20cm depth for most crop analysis.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900">Regular Monitoring</h4>
                    <p className="text-gray-600 text-sm">Test soil health at least twice a year for optimal crop management.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-800 mb-2">Optimal Ranges</h4>
                <div className="text-sm text-yellow-700 space-y-1">
                  <div>pH: 6.0 - 7.5</div>
                  <div>Nitrogen: 40-60 kg/ha</div>
                  <div>Phosphorus: 30-50 kg/ha</div>
                  <div>Potassium: 35-55 kg/ha</div>
                  <div>Organic Matter: 3-5%</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'results' && soilAnalysis && (
          <div className="space-y-6">
            {/* Overall Health */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Overall Soil Health</h2>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900 mr-2">{soilAnalysis.healthScore}/100</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(soilAnalysis.overallHealth)}`}>
                    {soilAnalysis.overallHealth}
                  </span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full" 
                  style={{ width: `${soilAnalysis.healthScore}%` }}
                ></div>
              </div>
            </div>

            {/* Parameter Analysis */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Parameter Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(soilAnalysis.parameters).map(([param, data]) => (
                  <div key={param} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900 capitalize">{param}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data.status)}`}>
                        {data.status}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-2">
                      {data.value}
                      {param === 'pH' ? '' : param === 'organicMatter' ? '%' : ' kg/ha'}
                    </p>
                    <p className="text-sm text-gray-600">{data.recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deficiencies */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Nutrient Deficiencies</h3>
              <div className="space-y-4">
                {soilAnalysis.deficiencies.map((def, index) => (
                  <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-red-800">{def.nutrient} Deficiency</h4>
                      <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs font-medium">
                        {def.severity}
                      </span>
                    </div>
                    <p className="text-red-700 mb-2"><strong>Solution:</strong> {def.solution}</p>
                    <p className="text-red-600 text-sm"><strong>Timing:</strong> {def.timing}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment Plan */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Treatment Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-red-700 mb-3">Immediate Actions</h4>
                  <ul className="space-y-2">
                    {soilAnalysis.treatmentPlan.immediate.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-4 h-4 text-red-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-yellow-700 mb-3">Short-term (1-3 months)</h4>
                  <ul className="space-y-2">
                    {soilAnalysis.treatmentPlan.shortTerm.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-4 h-4 text-yellow-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-green-700 mb-3">Long-term (6+ months)</h4>
                  <ul className="space-y-2">
                    {soilAnalysis.treatmentPlan.longTerm.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* General Recommendations */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">General Recommendations</h3>
              <ul className="space-y-2">
                {soilAnalysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Historical Data Coming Soon</h3>
            <p className="text-gray-600">
              Soil health trends and historical analysis will be available after multiple test entries.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoilHealthManagement;