import { connectDB, Stat } from '../../../lib/db';
export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;
  if (req.method === 'PUT') {
    const s = await Stat.findByIdAndUpdate(id, req.body, { new: true });
    return res.json({ success: true, data: s });
  }
  if (req.method === 'DELETE') {
    await Stat.findByIdAndDelete(id);
    return res.json({ success: true });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
