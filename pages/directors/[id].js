// pages/directors/[id].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:3000/api/directors/${id}`);
  const data = await res.json();

  if (!data.director) {
    return {
      notFound: true,
    };
  }

  return {
    props: { director: data.director, movies: data.movies },
  };
}

export default function DirectorDetails({ director, movies }) {
  return (
    <Layout>
      <h1>{director.name}</h1>
      <p>{director.biography}</p>
      <h2>Movies Directed</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </Layout>
  );
}