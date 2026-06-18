import { connectDB, Event } from '../../../lib/db';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'GET') {
    const e = await Event.findById(id).lean();
    if (!e) return res.status(404).json({ error: 'Not found' });
    return res.json({ success: true, data: e });
  }

  if (req.method === 'PUT') {
    const e = await Event.findByIdAndUpdate(id, req.body, { new: true });
    return res.json({ success: true, data: e });
  }

  if (req.method === 'DELETE') {
    await Event.findByIdAndDelete(id);
    return res.json({ success: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
