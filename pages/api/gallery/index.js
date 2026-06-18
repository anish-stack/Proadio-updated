import { connectDB, GalleryImage } from '../../../lib/db';
export default async function handler(req, res) {
  await connectDB();
  if (req.method === 'GET') {
    const { category } = req.query;
    const filter = category && category !== 'All' ? { category } : {};
    const data = await GalleryImage.find(filter).sort({ order: 1, createdAt: -1 }).lean();
    return res.json({ success: true, data });
  }
  if (req.method === 'POST') {
    const img = await GalleryImage.create(req.body);
    return res.status(201).json({ success: true, data: img });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
