import React, { useState } from 'react';

const YieldPrediction = () => {
  const [predictionData, setPredictionData] = useState({
    cropType: '',
    plantingDate: '',
    landArea: '',
    seedVariety: '',
    fertilizerType: '',
    irrigationMethod: '',
    previousYield: ''
  });

  const [predictions, setPredictions] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [historicalData, setHistoricalData] = useState([]);

  const cropTypes = ['Rice', 'Wheat', 'Maize', 'Tomato', 'Potato', 'Onion', 'Cotton', 'Sugarcane'];
  const fertilizerTypes = ['Organic', 'NPK', 'Urea', 'DAP', 'Complex', 'Bio-fertilizer'];
  const irrigationMethods = ['Drip', 'Sprinkler', 'Flood', 'Furrow', 'Rain-fed'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPredictionData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateYieldPrediction = async () => {
    setIsCalculating(true);
    
    // Simulate ML prediction calculation
    setTimeout(() => {
      const mockPrediction = {
        expectedYield: {
          minimum: 2.1,
          average: 2.8,
          maximum: 3.4,
          unit: 'tons/hectare'
        },
        confidence: 87,
        factors: [
          { name: 'Soil Quality', impact: 'Positive', value: '+15%' },
          { name: 'Weather Conditions', impact: 'Moderate', value: '+8%' },
          { name: 'Seed Variety', impact: 'Positive', value: '+12%' },
          { name: 'Irrigation Method', impact: 'Positive', value: '+10%' },
          { name: 'Fertilizer Usage', impact: 'Moderate', value: '+5%' }
        ],
        recommendations: [
          'Consider using drip irrigation for better water efficiency',
          'Apply organic fertilizer 2 weeks before planting',
          'Monitor for pest activity during flowering stage',
          'Ensure adequate spacing between plants for optimal growth'
        ],
        harvestDate: '2024-04-15',
        marketPrice: {
          current: 2800,
          predicted: 3100,
          currency: 'zmk/quintal'
        }
      };
      
      setPredictions(mockPrediction);
      
      // Add to historical data
      const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        crop: predictionData.cropType,
        predictedYield: mockPrediction.expectedYield.average,
        confidence: mockPrediction.confidence
      };
      
      setHistoricalData(prev => [newEntry, ...prev.slice(0, 4)]);
      setIsCalculating(false);
    }, 2500);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Yield Prediction</h1>
          <p className="text-gray-600">
            Predict crop yields using machine learning models based on your farming conditions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Crop Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Crop Type
                  </label>
                  <select
                    name="cropType"
                    value={predictionData.cropType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select crop type</option>
                    {cropTypes.map(crop => (
                      <option key={crop} value={crop}>{crop}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Planting Date
                  </label>
                  <input
                    type="date"
                    name="plantingDate"
                    value={predictionData.plantingDate}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Land Area (hectares)
                  </label>
                  <input
                    type="number"
                    name="landArea"
                    value={predictionData.landArea}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter land area"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seed Variety
                  </label>
                  <input
                    type="text"
                    name="seedVariety"
                    value={predictionData.seedVariety}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Hybrid, Local variety"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fertilizer Type
                  </label>
                  <select
                    name="fertilizerType"
                    value={predictionData.fertilizerType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select fertilizer type</option>
                    {fertilizerTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Irrigation Method
                  </label>
                  <select
                    name="irrigationMethod"
                    value={predictionData.irrigationMethod}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select irrigation method</option>
                    {irrigationMethods.map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous Yield (optional)
                  </label>
                  <input
                    type="number"
                    name="previousYield"
                    value={predictionData.previousYield}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="tons/hectare"
                  />
                </div>

                <button
                  onClick={calculateYieldPrediction}
                  disabled={isCalculating || !predictionData.cropType}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50"
                >
                  {isCalculating ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Calculating...
                    </div>
                  ) : (
                    'Predict Yield'
                  )}
                </button>
              </div>
            </div>

            {/* Historical Predictions */}
            {historicalData.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Recent Predictions</h3>
                <div className="space-y-3">
                  {historicalData.map(entry => (
                    <div key={entry.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{entry.crop}</p>
                        <p className="text-sm text-gray-600">{entry.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">{entry.predictedYield} t/ha</p>
                        <p className="text-sm text-gray-600">{entry.confidence}% confidence</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {predictions ? (
              <div className="space-y-6">
                {/* Main Prediction */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Yield Prediction Results</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                      <h3 className="font-semibold text-green-700">Minimum Yield</h3>
                      <p className="text-2xl font-bold text-green-800">
                        {predictions.expectedYield.minimum} {predictions.expectedYield.unit}
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                      <h3 className="font-semibold text-blue-700">Expected Yield</h3>
                      <p className="text-2xl font-bold text-blue-800">
                        {predictions.expectedYield.average} {predictions.expectedYield.unit}
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                      <h3 className="font-semibold text-purple-700">Maximum Yield</h3>
                      <p className="text-2xl font-bold text-purple-800">
                        {predictions.expectedYield.maximum} {predictions.expectedYield.unit}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Prediction Confidence</span>
                      <span className="text-sm font-medium text-gray-900">{predictions.confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${predictions.confidence}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-700 mb-2">Expected Harvest Date</h4>
                      <p className="text-yellow-800">{predictions.harvestDate}</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 mb-2">Market Price Prediction</h4>
                      <p className="text-green-800">
                        Current: {predictions.marketPrice.current} {predictions.marketPrice.currency}
                        <br />
                        Predicted: {predictions.marketPrice.predicted} {predictions.marketPrice.currency}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Impact Factors */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Yield Impact Factors</h3>
                  <div className="space-y-3">
                    {predictions.factors.map((factor, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">{factor.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            factor.impact === 'Positive' 
                              ? 'bg-green-100 text-green-700' 
                              : factor.impact === 'Moderate'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {factor.impact}
                          </span>
                          <span className="font-semibold text-gray-900">{factor.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Recommendations for Better Yield</h3>
                  <ul className="space-y-2">
                    {predictions.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Predictions Yet</h3>
                <p className="text-gray-600">
                  Enter your crop details and click "Predict Yield" to get AI-powered yield predictions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;