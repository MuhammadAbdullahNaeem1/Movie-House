import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const directors = await db.collection('directors').find({}).toArray();
        res.status(200).json(directors || []);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch directors' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}