import { connectDB, Product } from '../../../lib/db';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'GET') {
    const p = await Product.findById(id).lean();
    if (!p) return res.status(404).json({ error: 'Not found' });
    return res.json({ success: true, data: p });
  }

  if (req.method === 'PUT') {
    const p = await Product.findByIdAndUpdate(id, req.body, { new: true });
    return res.json({ success: true, data: p });
  }

  if (req.method === 'DELETE') {
    await Product.findByIdAndDelete(id);
    return res.json({ success: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
