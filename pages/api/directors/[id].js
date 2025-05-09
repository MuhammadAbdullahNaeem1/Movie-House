import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const director = await db.collection('directors').findOne({ id: id });
        if (!director) {
          return res.status(404).json({ error: 'Director not found' });
        }
        const movies = await db.collection('movies').find({ directorId: id }).toArray();
        res.status(200).json({ director, movies });
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch director details' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
} 