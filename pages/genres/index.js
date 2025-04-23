import { getGenres } from '../../lib/data';
import Layout from '../../components/Layout';
import Link from 'next/link';

export async function getServerSideProps() {
  const genres = getGenres();
  return { props: { genres } };
}

export default function GenresPage({ genres }) {
  // Array of background colors for genre cards
  const bgColors = [
    'bg-red-600', 'bg-blue-600', 'bg-green-600', 'bg-yellow-600', 
    'bg-purple-600', 'bg-pink-600', 'bg-indigo-600', 'bg-teal-600'
  ];
  
  return (
    <Layout>
      <h1 className="section-title mb-8">Browse Genres</h1>
      
      <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-3xl">
        Discover movies by your favorite genres. Click on any genre to explore our collection of 
        films in that category.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {genres.map((genre, index) => (
          <Link 
            href={`/genres/${genre.id}`} 
            key={genre.id} 
            className="block transition-transform hover:-translate-y-1"
          >
            <div className={`${bgColors[index % bgColors.length]} rounded-lg p-6 h-40 flex items-center justify-center shadow-lg`}>
              <h2 className="text-white text-2xl font-bold text-center">
                {genre.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}