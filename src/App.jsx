import './App.css'
import SkipSizeSelection from './components/SkipSizeSelection'
import ProgressSteps from './components/ProgressSteps'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white/80 backdrop-blur-md dark:bg-gray-800/80 shadow-lg py-5 sticky top-0 z-10">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 dark:text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">WeWantWaste</h1>
          </div>
          <nav>
            <ul className="flex gap-6">
              <li><a href="#" className="text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors">Services</a></li>
              <li><a href="#" className="text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-green-800 dark:text-green-600">Find Your Perfect Skip</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">Select the right size for your project and get it delivered to your doorstep.</p>
        </div>
        
        <div className="mb-12 max-w-4xl mx-auto">
          <ProgressSteps currentStep={3} />
        </div>
        
        <SkipSizeSelection />
      </main>
      
      <footer className="bg-gray-800 text-white py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">WeWantWaste</h3>
              <p className="text-gray-400">Sustainable waste management solutions for homes and businesses.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <address className="text-gray-400 not-italic">
                <p>123 Eco Street</p>
                <p>Green City, EC1 2WM</p>
                <p className="mt-2">contact@ecoskip.com</p>
                <p>+44 1234 567890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} WeWantWaste. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )   
}

export default App
