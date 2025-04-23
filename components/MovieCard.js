import Link from 'next/link';

export default function MovieCard({ movie }) {
  // Generate a placeholder image with movie title
  const placeholderImage = `https://via.placeholder.com/300x450/e50914/ffffff?text=${encodeURIComponent(movie.title)}`;
  
  return (
    <div className="movie-card">
      <div className="relative pb-[150%] overflow-hidden">
        <img 
          src={placeholderImage} 
          alt={movie.title} 
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="rating">{movie.rating}</span>
        </div>
      </div>
      <div className="card-content">
        <h2 className="text-xl font-semibold mb-1 line-clamp-1">{movie.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{movie.releaseYear}</p>
        
        <p className="text-sm line-clamp-2 text-gray-500 dark:text-gray-400 mb-3">
          {movie.description?.substring(0, 100)}...
        </p>
        
        <Link href={`/movies/${movie.id}`} 
          className="inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors">
          View Details
        </Link>
      </div>
    </div>
  );
}