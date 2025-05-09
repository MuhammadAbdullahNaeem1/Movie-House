import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { method } = req;

  switch (method) {
    case 'GET':
      if (req.query.id) {
        // Get movie details by ID
        const movie = await db.collection('movies').findOne({ _id: req.query.id });
        res.status(200).json(movie);
      } else {
        // Get all movies
        const movies = await db.collection('movies').find({}).toArray();
        res.status(200).json(movies);
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
} 