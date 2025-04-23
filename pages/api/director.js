import { getDirectors, getAllMovies } from '../../lib/data';
export default function handler(req, res) {
  const directors = getDirectors().map(d => ({
    ...d,
    movies: getAllMovies().filter(m => m.directorId === d.id)
  }));
  res.status(200).json(directors);
}
