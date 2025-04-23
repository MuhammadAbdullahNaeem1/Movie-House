import { getGenres, getAllMovies, getGenreById } from '../../lib/data';
import Layout from '../../components/Layout';
import MovieCard from '../../components/MovieCard';
import Link from 'next/link';

export async function getServerSideProps({ params }) {
  const genre = getGenreById(params.id);
  if (!genre) {
    return { notFound: true };
  }
  const movies = getAllMovies().filter(m => m.genreId === params.id);
  return { props: { genre, movies } };
}

export default function GenreDetail({ genre, movies }) {
  // Get a background color based on genre id
  const getGenreColor = () => {
    const colors = {
      'g1': 'from-red-600 to-red-800',
      'g2': 'from-blue-600 to-blue-800',
      'g3': 'from-green-600 to-green-800',
      'g4': 'from-yellow-600 to-yellow-800',
      'g5': 'from-purple-600 to-purple-800',
      'g6': 'from-pink-600 to-pink-800',
      'g7': 'from-indigo-600 to-indigo-800',
      'g8': 'from-teal-600 to-teal-800',
    };
    return colors[genre.id] || 'from-gray-600 to-gray-800';
  };
  
  return (
    <Layout>
      <div className={`bg-gradient-to-r ${getGenreColor()} rounded-xl p-8 mb-8 shadow-lg`}>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">{genre.name} Movies</h1>
        <p className="text-white text-opacity-80 text-lg mb-6">
          Explore our collection of {movies.length} {genre.name.toLowerCase()} films
        </p>
        
        <Link href="/genres" className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors text-white rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Genres
        </Link>
      </div>
      
      {movies.length > 0 ? (
        <div className="movie-grid">
          {movies.map(m => <MovieCard key={m.id} movie={m} />)}
        </div>
      ) : (
        <div className="text-center p-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-xl font-medium mb-2">No movies found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            We couldn't find any movies in this genre.
          </p>
        </div>
      )}
    </Layout>
  );
}