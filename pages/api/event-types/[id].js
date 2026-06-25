import { connectDB, EventType } from '../../../lib/db';
export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;
  if (req.method === 'PUT') {
    const item = await EventType.findByIdAndUpdate(id, req.body, { new: true });
    return res.json({ success: true, data: item });
  }
  if (req.method === 'DELETE') {
    await EventType.findByIdAndDelete(id);
    return res.json({ success: true });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
