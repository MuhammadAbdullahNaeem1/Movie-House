import { useEffect, useState } from 'react';
import Layout from '/components/Layout';
import Link from 'next/link';

export default function DirectorsPage() {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDirectors() {
      try {
        const response = await fetch('/api/directors');
        const data = await response.json();
        setDirectors(data || []); // Ensure data is an array
      } catch (error) {
        console.error('Error fetching directors:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDirectors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Array of background colors for director cards
  const bgColors = [
    'bg-red-600', 'bg-blue-600', 'bg-green-600', 'bg-yellow-600', 
    'bg-purple-600', 'bg-pink-600', 'bg-indigo-600', 'bg-teal-600'
  ];

  return (
    <Layout>
      <h1 className="section-title mb-8">Film Directors</h1>
      
      <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-3xl">
        Discover the creative minds behind your favorite films. Learn about their biography and explore their filmography.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {directors.map((director, index) => (
          <Link 
            href={`/directors/${director.id}`} 
            key={director._id} 
            className="block transition-transform hover:-translate-y-1"
          >
            <div className={`${bgColors[index % bgColors.length]} rounded-lg p-6 h-40 flex items-center justify-center shadow-lg`}>
              <h2 className="text-white text-2xl font-bold text-center">
                {director.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}