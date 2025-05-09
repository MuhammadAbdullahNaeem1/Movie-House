import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { method } = req;

  switch (method) {
    case 'GET':
      if (req.query.id) {
        // Get movies by genre ID
        const movies = await db.collection('movies').find({ genreId: req.query.id }).toArray();
        res.status(200).json(movies);
      } else {
        // Get all genres
        const genres = await db.collection('genres').find({}).toArray();
        res.status(200).json(genres);
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
} 