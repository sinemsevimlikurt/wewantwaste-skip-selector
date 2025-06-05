import { useState, useEffect } from 'react';

const SkipSizeSelection = () => {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setSkips(data);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch skip data: ${err.message}`);
        console.error('Error fetching skip data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700">Loading skip options...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-lg font-medium text-red-800 mb-2">Unable to load skip options</h3>
        <p className="text-red-700">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h2 className="text-3xl font-bold text-center mb-2 animate-fadeIn opacity-0">Choose Your Skip Size</h2>
      <p className="text-gray-600 text-center mb-8 animate-slideUp opacity-0" style={{animationDelay: '0.5s'}}>Select the skip size that best suits your needs</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {skips.map((skip) => (
          <div key={skip.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg hover:border-green-500 transition-all duration-300">
            <div className="relative">
              <img 
                src={skip.image_url || `https://placehold.co/600x400/FFD700/333?text=${skip.size}+Yard+Skip`} 
                alt={`${skip.size} Yard Skip`} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {skip.size} Yards
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="text-xl font-bold mb-1">{skip.size} Yard Skip</h3>
              <p className="text-gray-600 mb-4">14 day hire period</p>
              <p className="text-2xl font-bold text-blue-600 mb-4">£{skip.price}</p>
              
              <button 
                className="w-full bg-blue-400 hover:bg-blue-500 text-white py-3 px-4 rounded-md flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg group relative overflow-hidden"
              >
                <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">Select This Skip</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="absolute inset-0 bg-green-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkipSizeSelection;
