import useSWR from 'swr';
import Layout from '../components/Layout';
import Link from 'next/link';

const fetcher = url => fetch(url).then(res => res.json());

export default function DirectorsPage() {
  const { data, error, isLoading } = useSWR('/api/directors', fetcher);

  return (
    <Layout>
      <h1 className="section-title mb-8">Film Directors</h1>

      <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-3xl">
        Discover the creative minds behind your favorite films. Learn about their biography and explore their filmography.
      </p>
      
      {isLoading && (
        <div className="flex justify-center items-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700 dark:text-red-300">Failed to load directors. Please try again later.</p>
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map(director => (
            <div key={director.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-2xl text-white font-bold mr-4">
                    {director.name.charAt(0)}
                  </div>
                  <h2 className="text-2xl font-bold">{director.name}</h2>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-3">
                  {director.biography}
                </p>
                
                <h3 className="text-lg font-semibold mb-3">Filmography</h3>
                <ul className="space-y-2 mb-6">
                  {director.movies.slice(0, 3).map(movie => (
                    <li key={movie.id} className="flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      <Link href={`/movies/${movie.id}`} className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500">
                        {movie.title} ({movie.releaseYear})
                      </Link>
                    </li>
                  ))}
                  {director.movies.length > 3 && (
                    <li className="text-sm text-gray-500 dark:text-gray-400 pl-4">
                      + {director.movies.length - 3} more films
                    </li>
                  )}
                </ul>
                
                {/* We could add a "View full profile" button here if we had individual director pages */}
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}