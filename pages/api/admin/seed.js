import { connectDB, Product, Event, GalleryImage, Page, Settings, Stat } from '../../../lib/db';
import { PRODUCTS_SEED, GALLERY_SEED, POLICY_PAGES_SEED, EVENTS_SEED, SETTINGS_SEED, STATS_SEED } from '../../../lib/siteData';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const secret = req.headers['x-admin-secret'] || req.body?.secret;
  if (secret !== (process.env.ADMIN_SECRET || 'proaudio-admin-2024')) return res.status(401).json({ error: 'Unauthorized' });

  await connectDB();
  const results = {};

  // Products
  const pCount = await Product.countDocuments();
  if (pCount === 0) {
    await Product.insertMany(PRODUCTS_SEED);
    results.products = `Seeded ${PRODUCTS_SEED.length}`;
  } else results.products = `Skipped (${pCount} exist)`;

  // Events
  const eCount = await Event.countDocuments();
  if (eCount === 0) {
    await Event.insertMany(EVENTS_SEED);
    results.events = `Seeded ${EVENTS_SEED.length}`;
  } else results.events = `Skipped (${eCount} exist)`;

  // Gallery
  const gCount = await GalleryImage.countDocuments();
  if (gCount === 0) {
    await GalleryImage.insertMany(GALLERY_SEED);
    results.gallery = `Seeded ${GALLERY_SEED.length}`;
  } else results.gallery = `Skipped (${gCount} exist)`;

  // Policy pages
  for (const pg of POLICY_PAGES_SEED) {
    await Page.findOneAndUpdate({ slug: pg.slug }, pg, { upsert: true, new: true });
  }
  results.pages = `Upserted ${POLICY_PAGES_SEED.length} policy pages`;

  // Settings
  for (const s of SETTINGS_SEED) {
    await Settings.findOneAndUpdate({ key: s.key }, s, { upsert: true, new: true });
  }
  results.settings = `Upserted ${SETTINGS_SEED.length} settings`;

  // Stats
  for (const s of STATS_SEED) {
    await Stat.findOneAndUpdate({ key: s.key }, s, { upsert: true, new: true });
  }
  results.stats = `Upserted ${STATS_SEED.length} stats`;

  return res.json({ success: true, results });
}
