import { getAllMovies, getMovieById, getDirectorById, getGenreById } from '../../lib/data';
import Layout from '../../components/Layout';
import Link from 'next/link';

export async function getStaticPaths() {
  const movies = getAllMovies();
  const paths = movies.map(m => ({ params: { id: m.id }}));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const movie = getMovieById(params.id);
  if (!movie) return { notFound: true };
  const director = getDirectorById(movie.directorId);
  const genre = getGenreById(movie.genreId);
  return {
    props: { movie, director, genre },
    revalidate: 60
  };
}

export default function MovieDetail({ movie, director, genre }) {
  // Generate a placeholder image
  const placeholderImage = `https://via.placeholder.com/500x750/e50914/ffffff?text=${encodeURIComponent(movie.title)}`;
  
  return (
    <Layout>
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
        <div className="md:flex">
          {/* Movie Poster */}
          <div className="md:w-1/3 relative">
            <div className="aspect-[2/3] relative">
              <img 
                src={placeholderImage} 
                alt={movie.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Movie Info */}
          <div className="md:w-2/3 p-6 md:p-8">
            <div className="flex items-center mb-4">
              <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full mr-3">
                {movie.rating}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{genre?.name}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{movie.releaseYear}</p>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Synopsis</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {movie.description}
              </p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Director</h2>
              <Link href={`/movies/${movie.id}/director`} className="flex items-center group">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-xl font-bold text-gray-600 dark:text-gray-300 mr-3">
                  {director?.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium group-hover:text-red-600 transition-colors">{director?.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">View Director Info</p>
                </div>
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-8">
              <Link href="/movies" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                ← Back to Movies
              </Link>
              <Link href={`/genres/${genre?.id}`} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                More {genre?.name} Movies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}