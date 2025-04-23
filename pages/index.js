import { getAllMovies } from '../lib/data';
import Layout from '../components/Layout';
import MovieCard from '../components/MovieCard';
import { useRouter } from 'next/router';
import Link from 'next/link';

export async function getStaticProps() {
  const movies = getAllMovies().slice(0, 4);
  return { props: { movies }, revalidate: 60 };
}

export default function Home({ movies }) {
  const router = useRouter();
  
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative mb-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-pattern"></div>
        <div className="relative px-8 py-12 md:py-20 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Welcome to Movie House</h1>
          <p className="text-xl text-gray-200 mb-8">Discover the best movies, browse by genres, and explore film directors</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => router.push('/movies')}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 transition-colors text-white font-medium rounded-md"
            >
              Browse All Movies
            </button>
            <button 
              onClick={() => router.push('/genres')}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 transition-colors text-white font-medium rounded-md"
            >
              Browse Genres
            </button>
          </div>
        </div>
      </div>
      
      {/* Trending Section */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h2 className="section-title">Trending Movies</h2>
          <Link href="/movies" className="text-red-600 hover:text-red-700 font-medium text-sm">
            View All Movies →
          </Link>
        </div>
        
        <div className="movie-grid">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="mt-16 grid md:grid-cols-3 gap-8">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
          <h3 className="text-xl font-semibold mb-2">Extensive Collection</h3>
          <p className="text-gray-600 dark:text-gray-300">Explore our vast collection of movies from all genres and eras.</p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-xl font-semibold mb-2">Director Insights</h3>
          <p className="text-gray-600 dark:text-gray-300">Learn about the visionaries behind your favorite films.</p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <h3 className="text-xl font-semibold mb-2">Genre Filtering</h3>
          <p className="text-gray-600 dark:text-gray-300">Easily find movies by filtering through different genres.</p>
        </div>
      </section>
    </Layout>
  );
}
