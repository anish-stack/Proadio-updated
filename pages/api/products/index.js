import { connectDB, Product } from '../../../lib/db';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const { category, featured } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    const products = await Product.find(filter).sort({ featured: -1, order: 1, name: 1 }).lean();
    return res.json({ success: true, data: products });
  }

  if (req.method === 'POST') {
    const product = await Product.create(req.body);
    return res.status(201).json({ success: true, data: product });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
