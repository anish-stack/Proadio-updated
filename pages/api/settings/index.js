import { connectDB, Settings } from '../../../lib/db';
export default async function handler(req, res) {
  await connectDB();
  if (req.method === 'GET') {
    const settings = await Settings.find({}).lean();
    const map = {};
    settings.forEach(s => { map[s.key] = s.value; });
    return res.json({ success: true, data: map, raw: settings });
  }
  if (req.method === 'POST') {
    const { key, value, label, group } = req.body;
    const s = await Settings.findOneAndUpdate({ key }, { value, label, group }, { upsert: true, new: true });
    return res.json({ success: true, data: s });
  }
  if (req.method === 'PUT') {
    // bulk update: body = { settings: [{key,value},...] }
    const { settings } = req.body;
    if (!Array.isArray(settings)) return res.status(400).json({ error: 'settings array required' });
    await Promise.all(settings.map(({ key, value }) =>
      Settings.findOneAndUpdate({ key }, { value }, { upsert: true, new: true })
    ));
    return res.json({ success: true });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
