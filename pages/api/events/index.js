import { connectDB, Event } from '../../../lib/db';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const { upcoming, category, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (upcoming === 'true') { filter.isUpcoming = true; filter.date = { $gte: new Date() }; }
    if (upcoming === 'false') filter.isUpcoming = false;
    if (category) filter.category = category;
    const total = await Event.countDocuments(filter);
    const data = await Event.find(filter).sort({ date: upcoming === 'true' ? 1 : -1 }).skip((page - 1) * limit).limit(Number(limit)).lean();
    return res.json({ success: true, data, total });
  }

  if (req.method === 'POST') {
    const event = await Event.create(req.body);
    return res.status(201).json({ success: true, data: event });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
