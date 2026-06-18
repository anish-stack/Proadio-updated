import { connectDB, Stat } from '../../../lib/db';
export default async function handler(req, res) {
  await connectDB();
  if (req.method === 'GET') {
    const stats = await Stat.find({ visible: true }).sort({ order: 1 }).lean();
    return res.json({ success: true, data: stats });
  }
  if (req.method === 'PUT') {
    const { stats } = req.body;
    await Promise.all(stats.map(s =>
      Stat.findOneAndUpdate({ key: s.key }, s, { upsert: true, new: true })
    ));
    return res.json({ success: true });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
