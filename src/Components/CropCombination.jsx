import React, { useState } from 'react';

const CropCombination = () => {
  const [formData, setFormData] = useState({
    landSize: '',
    soilType: '',
    climate: '',
    waterAvailability: '',
    budget: '',
    preferredCrops: []
  });

  const [recommendations, setRecommendations] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const soilTypes = ['Loamy', 'Clay', 'Sandy', 'Silty', 'Peaty', 'Chalky'];
  const climateZones = ['Tropical', 'Subtropical', 'Temperate', 'Arid', 'Semi-Arid'];
  const cropOptions = ['Rice', 'Wheat', 'Maize', 'Tomato', 'Beans', 'Lentils', 'Sugarcane', 'Cotton', 'Onion', 'Potato'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCropSelection = (crop) => {
    setFormData(prev => ({
      ...prev,
      preferredCrops: prev.preferredCrops.includes(crop)
        ? prev.preferredCrops.filter(c => c !== crop)
        : [...prev.preferredCrops, crop]
    }));
  };

  const analyzeOptimalCombination = async () => {
    setIsAnalyzing(true);
    
    // Simulate ML analysis
    setTimeout(() => {
      const mockRecommendations = [
        {
          id: 1,
          combination: ['Rice', 'Beans', 'Tomato'],
          expectedYield: '2.8 tons/hectare',
          profitability: 'High',
          compatibility: 95,
          season: 'Kharif',
          benefits: [
            'Nitrogen fixation from beans improves soil',
            'Diverse income streams',
            'Reduced pest pressure through crop diversity'
          ],
          spacing: {
            rice: '60% of land',
            beans: '25% of land',
            tomato: '15% of land'
          }
        },
        {
          id: 2,
          combination: ['Wheat', 'Lentils', 'Onion'],
          expectedYield: '2.5 tons/hectare',
          profitability: 'Medium-High',
          compatibility: 88,
          season: 'Rabi',
          benefits: [
            'Complementary root systems',
            'Natural pest deterrent from onions',
            'Year-round productivity'
          ],
          spacing: {
            wheat: '50% of land',
            lentils: '30% of land',
            onion: '20% of land'
          }
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crop Combination Suggestions</h1>
          <p className="text-gray-600">
            Get AI-powered recommendations for optimal poly crop combinations based on your farm conditions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Farm Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Land Size (hectares)
                  </label>
                  <input
                    type="number"
                    name="landSize"
                    value={formData.landSize}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter land size"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soil Type
                  </label>
                  <select
                    name="soilType"
                    value={formData.soilType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select soil type</option>
                    {soilTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Climate Zone
                  </label>
                  <select
                    name="climate"
                    value={formData.climate}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select climate zone</option>
                    {climateZones.map(zone => (
                      <option key={zone} value={zone}>{zone}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Water Availability
                  </label>
                  <select
                    name="waterAvailability"
                    value={formData.waterAvailability}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select water availability</option>
                    <option value="abundant">Abundant (Irrigated)</option>
                    <option value="moderate">Moderate (Seasonal)</option>
                    <option value="limited">Limited (Rain-fed)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., zmk50,000 - zmk1,00,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Crops (Select multiple)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {cropOptions.map(crop => (
                      <button
                        key={crop}
                        type="button"
                        onClick={() => handleCropSelection(crop)}
                        className={`p-2 text-sm rounded-md border transition-colors ${
                          formData.preferredCrops.includes(crop)
                            ? 'bg-green-100 border-green-500 text-green-700'
                            : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {crop}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={analyzeOptimalCombination}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-md hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </div>
                  ) : (
                    'Get Crop Combinations'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {recommendations.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Recommended Crop Combinations</h2>
                
                {recommendations.map(rec => (
                  <div key={rec.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {rec.combination.join(' + ')}
                        </h3>
                        <p className="text-gray-600">{rec.season} Season</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 mr-2">Compatibility:</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${rec.compatibility}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium">{rec.compatibility}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <h4 className="font-medium text-green-700">Expected Yield</h4>
                        <p className="text-lg font-semibold text-green-800">{rec.expectedYield}</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="font-medium text-blue-700">Profitability</h4>
                        <p className="text-lg font-semibold text-blue-800">{rec.profitability}</p>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <h4 className="font-medium text-yellow-700">Land Distribution</h4>
                        <div className="text-sm text-yellow-800">
                          {Object.entries(rec.spacing).map(([crop, percentage]) => (
                            <div key={crop}>{crop}: {percentage}</div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Benefits:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {rec.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Recommendations Yet</h3>
                <p className="text-gray-600">
                  Fill in your farm details and click "Get Crop Combinations" to receive personalized recommendations.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropCombination;