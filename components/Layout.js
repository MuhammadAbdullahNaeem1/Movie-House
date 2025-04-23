import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-red-600 mr-2">
                  <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                  <line x1="7" y1="2" x2="7" y2="22"></line>
                  <line x1="17" y1="2" x2="17" y2="22"></line>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <line x1="2" y1="7" x2="7" y2="7"></line>
                  <line x1="2" y1="17" x2="7" y2="17"></line>
                  <line x1="17" y1="17" x2="22" y2="17"></line>
                  <line x1="17" y1="7" x2="22" y2="7"></line>
                </svg>
                <span className="text-2xl font-bold text-gray-800 dark:text-white">Movie House</span>
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 font-medium">
                Home
              </Link>
              <Link href="/movies" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 font-medium">
                Movies
              </Link>
              <Link href="/genres" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 font-medium">
                Genres
              </Link>
              <Link href="/directors" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 font-medium">
                Directors
              </Link>
              <Link href="/help" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 font-medium">
                Help
              </Link>
            </nav>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button type="button" className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
        {children}
      </main>
      
      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start md:order-2">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 mx-2">
                Home
              </Link>
              <Link href="/help" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 mx-2">
                Help
              </Link>
              <Link href="/help/privacy" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 mx-2">
                Privacy
              </Link>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()} Movie House. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
