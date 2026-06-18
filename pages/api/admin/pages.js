import { connectDB, Page } from '../../../lib/db';
export default async function handler(req, res) {
  await connectDB();
  if (req.method === 'GET') {
    const pages = await Page.find({}).sort({ updatedAt: -1 }).lean();
    return res.json({ success: true, data: pages });
  }
  if (req.method === 'POST') {
    const { slug, title } = req.body;
    if (!slug || !title) return res.status(400).json({ error: 'slug and title required' });
    const existing = await Page.findOne({ slug });
    if (existing) return res.status(409).json({ error: 'Slug already exists' });
    const page = await Page.create({ ...req.body, updatedAt: new Date() });
    return res.status(201).json({ success: true, data: page });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
