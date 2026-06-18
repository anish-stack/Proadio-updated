import { connectDB, Category, GalleryImage, Event } from '../../../lib/db';

const DEFAULTS = {
  gallery: ['Wedding', 'Corporate', 'Concert', 'College', 'Government', 'Other'],
  event: ['Corporate', 'Wedding', 'Concert', 'College', 'Government', 'Other'],
};

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const { type } = req.query; // 'gallery' | 'event'
    if (!type || !DEFAULTS[type]) return res.status(400).json({ error: 'type must be gallery or event' });

    let cats = await Category.find({ type }).sort({ order: 1, name: 1 }).lean();

    // First-run convenience: seed the existing hardcoded defaults so nothing
    // that already relies on these category names breaks.
    if (cats.length === 0) {
      await Category.insertMany(DEFAULTS[type].map((name, i) => ({ name, type, order: i })));
      cats = await Category.find({ type }).sort({ order: 1, name: 1 }).lean();
    }
    return res.json({ success: true, data: cats });
  }

  if (req.method === 'POST') {
    const { name, type } = req.body;
    if (!name?.trim() || !DEFAULTS[type]) return res.status(400).json({ error: 'name and valid type required' });
    try {
      const count = await Category.countDocuments({ type });
      const cat = await Category.create({ name: name.trim(), type, order: count });
      return res.status(201).json({ success: true, data: cat });
    } catch (err) {
      if (err.code === 11000) return res.status(409).json({ error: 'Category already exists' });
      throw err;
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'id required' });
    const cat = await Category.findById(id).lean();
    if (cat && cat.type === 'gallery') {
      const inUse = await GalleryImage.countDocuments({ category: cat.name });
      if (inUse > 0) return res.status(409).json({ error: `Cannot delete — ${inUse} gallery image(s) still use this category` });
    }
    if (cat && cat.type === 'event') {
      const inUse = await Event.countDocuments({ category: cat.name });
      if (inUse > 0) return res.status(409).json({ error: `Cannot delete — ${inUse} event(s) still use this category` });
    }
    await Category.findByIdAndDelete(id);
    return res.json({ success: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
