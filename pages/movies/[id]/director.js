import { getAllMovies, getMovieById, getDirectorById, getAllMovies as allMovies } from '../../../lib/data';
import Layout from '../../../components/Layout';
import Link from 'next/link';

export async function getStaticPaths() {
  const movies = getAllMovies();
  return {
    paths: movies.map(m => ({ params: { id: m.id }})),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const movie = getMovieById(params.id);
  const director = getDirectorById(movie.directorId);
  // movies by this director
  const directorMovies = allMovies().filter(m => m.directorId === director.id);
  return { props: { director, directorMovies, movieId: params.id } };
}

export default function DirectorInfo({ director, directorMovies, movieId }) {
  // Generate a placeholder avatar for the director
  const avatarPlaceholder = `https://via.placeholder.com/300x300/e50914/ffffff?text=${encodeURIComponent(director.name.charAt(0))}`;
  
  return (
    <Layout>
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg mb-8">
        <div className="md:flex">
          {/* Director Avatar */}
          <div className="md:w-1/4 p-8 flex justify-center">
            <div className="w-48 h-48 rounded-full overflow-hidden">
              <img 
                src={avatarPlaceholder} 
                alt={director.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Director Info */}
          <div className="md:w-3/4 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{director.name}</h1>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Biography</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {director.biography}
              </p>
            </div>
            
            <Link 
              href={`/movies/${movieId}`}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors inline-flex items-center"
            >
              ← Back to Movie
            </Link>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="section-title mb-6">Filmography</h2>
        
        <div className="grid gap-4 sm:grid-cols-2">
          {directorMovies.map(movie => (
            <Link href={`/movies/${movie.id}`} key={movie.id}>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center">
                <div className="w-16 h-24 bg-gray-200 dark:bg-gray-700 overflow-hidden rounded mr-4 flex-shrink-0">
                  <img 
                    src={`https://via.placeholder.com/128x192/e50914/ffffff?text=${encodeURIComponent(movie.title.charAt(0))}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium mb-1">{movie.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{movie.releaseYear}</p>
                  <p className="text-sm mt-1">
                    <span className="inline-block px-2 py-1 bg-red-600 text-white text-xs rounded">
                      {movie.rating}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}