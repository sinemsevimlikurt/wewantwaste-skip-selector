import { useState, useEffect } from 'react';

const API_URL = 'https://app.wewantwaste.co.uk/api/skips/by-location';
const DEFAULT_POSTCODE = 'NR32';
const DEFAULT_AREA = 'Lowestoft';

// Format price with currency symbol
const formatPrice = (price, currency = "£") => {
  // Handle undefined, null or non-numeric values
  if (price === undefined || price === null || isNaN(price)) {
    return `${currency}0.00`;
  }
  return `${currency}${Number(price).toFixed(2)}`;
};

const SkipSizeSelection = () => {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkips = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const url = `${API_URL}?postcode=${encodeURIComponent(DEFAULT_POSTCODE)}&area=${encodeURIComponent(DEFAULT_AREA)}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API returned error status: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('API did not return an array of skips as expected');
      }
      
      setSkips(data);
    } catch (err) {
      console.error('Error fetching skip data:', err);
      setError('Unable to load skip options. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkips();
  }, []); // Only fetch once on component mount

  if (loading) {
    return (
      <section 
        aria-live="polite" 
        aria-busy="true"
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="flex flex-col items-center" role="status">
          <div 
            className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"
            aria-hidden="true"
          ></div>
          <p className="mt-4 text-gray-700">Loading skip options...</p>
          <span className="sr-only">Loading skip options, please wait</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section 
        className="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
        aria-live="assertive"
        role="alert"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 mx-auto text-red-500 mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-lg font-medium text-red-800 mb-2">Unable to load skip options</h3>
        <p className="text-red-700">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Try loading skip options again"
        >
          Try Again
        </button>
      </section>
    );
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 overflow-x-hidden">
      <header>
        <h1 className="text-3xl font-bold text-center mb-2 animate-fadeIn opacity-0">Choose Your Skip Size</h1>
        <p className="text-gray-600 text-center mb-8 animate-slideUp opacity-0" style={{animationDelay: '0.5s'}}>Select the skip size that best suits your needs</p>
      </header>
      
      <section 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        aria-labelledby="skip-options-heading"
        role="region"
      >
        <h2 id="skip-options-heading" className="sr-only">Available Skip Options</h2>
        {skips.map((skip) => (
          <article 
            key={skip.id} 
            className="border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg hover:border-green-500 transition-all duration-300"
          >
            <div className="relative">
              <img 
                src={skip.image_url || `https://placehold.co/600x400/FFD700/333?text=${skip.size}+Yard+Skip`} 
                alt={`${skip.size} Yard Skip - Visual representation`} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium" aria-hidden="true">
                {skip.size} Yards
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="text-xl font-bold mb-1">{skip.size} Yard Skip</h3>
              <p className="text-gray-600 mb-4">{skip.hire_period_days} day hire period</p>
              <p className="text-sm text-gray-500 mb-2">{skip.description}</p>
              <dl className="flex justify-between items-center mb-4">
                <div>
                  <dt className="text-xs text-gray-500">Dimensions</dt>
                  <dd className="text-sm font-medium">{skip.dimensions}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">Capacity</dt>
                  <dd className="text-sm font-medium">{skip.capacity}</dd>
                </div>
              </dl>
              <p className="text-2xl font-bold text-emerald-600 mb-4" aria-label={`Price: ${formatPrice(skip.price)}`}>{formatPrice(skip.price)}</p>
              
              <button 
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-md flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                aria-label={`Select ${skip.size} yard skip for ${formatPrice(skip.price)}`}
              >
                <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">Select This Skip</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="absolute inset-0 bg-green-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" aria-hidden="true"></span>
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default SkipSizeSelection;
