import { connectDB, Page } from '../../../../lib/db';
export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;
  if (req.method === 'PUT') {
    const page = await Page.findByIdAndUpdate(id, { ...req.body, updatedAt: new Date() }, { new: true });
    return res.json({ success: true, data: page });
  }
  if (req.method === 'DELETE') {
    await Page.findByIdAndDelete(id);
    return res.json({ success: true });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
