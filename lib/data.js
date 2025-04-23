import path from 'path';

// Cache data once loaded
let cachedData = null;

export function getData() {
  // This code only runs on the server side
  if (typeof window === 'undefined') {
    if (cachedData) {
      return cachedData;
    }
    
    // Import fs dynamically, only on the server
    const fs = require('fs');
    const filePath = path.join(process.cwd(), 'data', 'movies.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    cachedData = JSON.parse(fileContents);
    
    return cachedData;
  }
  
  // If this code runs on the client, it means there's a problem with data fetching
  throw new Error(
    'getData() should only be called from getStaticProps or getServerSideProps'
  );
}

export function getAllMovies() {
  return getData().movies;
}

export function getMovieById(id) {
  // Use direct string comparison since IDs in JSON are strings
  return getData().movies.find(m => m.id === id);
}

export function getGenres() {
  return getData().genres;
}

export function getGenreById(id) {
  // Use direct string comparison since IDs in JSON are strings
  return getData().genres.find(g => g.id === id);
}

export function getDirectors() {
  return getData().directors;
}

export function getDirectorById(id) {
  // Use direct string comparison since IDs in JSON are strings
  return getData().directors.find(d => d.id === id);
}
