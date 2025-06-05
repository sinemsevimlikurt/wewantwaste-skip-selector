import './App.css'
import SkipSizeSelection from './components/SkipSizeSelection'
import ProgressSteps from './components/ProgressSteps'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white/80 backdrop-blur-md dark:bg-gray-800/80 shadow-lg py-3 sm:py-5 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 dark:text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">WeWantWaste</h1>
          </div>
          <nav className="mt-2 sm:mt-0">
            <ul className="flex gap-4 sm:gap-6 text-sm sm:text-base">
              <li><a href="#" className="text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors">Services</a></li>
              <li><a href="#" className="text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 sm:mb-4 text-green-800 dark:text-green-600">Find Your Perfect Skip</h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">Select the right size for your project and get it delivered to your doorstep.</p>
        </div>
        
        <div className="mb-12 max-w-4xl mx-auto">
          <ProgressSteps currentStep={3} />
        </div>
        
        <SkipSizeSelection />
      </main>
      
      <footer className="bg-gray-800 text-white py-8 sm:py-10 md:py-12 mt-12 sm:mt-16 md:mt-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <div className="mb-6 sm:mb-0">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">WeWantWaste</h3>
              <p className="text-gray-400 text-sm sm:text-base">Sustainable waste management solutions for homes and businesses.</p>
            </div>
            <div className="mb-6 sm:mb-0">
              <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Quick Links</h3>
              <ul className="space-y-1 sm:space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm sm:text-base">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm sm:text-base">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm sm:text-base">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Contact</h3>
              <address className="text-gray-400 not-italic text-sm sm:text-base">
                <p>123 Eco Street</p>
                <p>Green City, EC1 2WM</p>
                <p className="mt-2">contact@wewantwaste.com</p>
                <p>+44 1234 567890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
            <p>© {new Date().getFullYear()} WeWantWaste. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )   
}

export default App
