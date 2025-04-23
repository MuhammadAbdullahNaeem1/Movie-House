import { getAllMovies, getGenres } from '../../lib/data';
import Layout from '../../components/Layout';
import MovieCard from '../../components/MovieCard';
import { useState } from 'react';

export async function getStaticProps() {
  const movies = getAllMovies();
  const genres = getGenres();
  return { props: { movies, genres }, revalidate: 60 };
}

export default function MoviesPage({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState('');
  const filtered = selectedGenre ? movies.filter(m => m.genreId === selectedGenre) : movies;
  return (
    <Layout>
      <h1 className="text-3xl mb-4">All Movies</h1>
      <div className="mb-4">
        <select
          value={selectedGenre}
          onChange={e => setSelectedGenre(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Genres</option>
          {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {filtered.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </Layout>
  );
}