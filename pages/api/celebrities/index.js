import { connectDB, Celebrity } from '../../../lib/db';
export default async function handler(req, res) {
  await connectDB();
  if (req.method === 'GET') {
    const data = await Celebrity.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return res.json({ success: true, data });
  }
  if (req.method === 'POST') {
    const item = await Celebrity.create(req.body);
    return res.status(201).json({ success: true, data: item });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
