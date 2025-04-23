import useSWR from 'swr';
import Layout from '../components/Layout';

const fetcher = url => fetch(url).then(res => res.json());
export default function DirectorsPage() {
  const { data, error } = useSWR('/api/directors', fetcher);

  if (error) return <Layout><p>Failed to load directors.</p></Layout>;
  if (!data) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h1 className="text-3xl mb-4">Directors</h1>
      {data.map(d => (
        <div key={d.id} className="mb-6 p-4 border rounded">
          <h2 className="text-2xl font-semibold">{d.name}</h2>
          <p className="mb-2">{d.biography}</p>
          <h3 className="font-medium">Movies:</h3>
          <ul className="list-disc ml-6">
            {d.movies.map(m => <li key={m.id}>{m.title} ({m.releaseYear})</li>)}
          </ul>
        </div>
      ))}
    </Layout>
  );
}