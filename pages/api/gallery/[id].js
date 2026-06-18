import { connectDB, GalleryImage } from '../../../lib/db';
export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;
  if (req.method === 'PUT') {
    const img = await GalleryImage.findByIdAndUpdate(id, req.body, { new: true });
    return res.json({ success: true, data: img });
  }
  if (req.method === 'DELETE') {
    await GalleryImage.findByIdAndDelete(id);
    return res.json({ success: true });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
