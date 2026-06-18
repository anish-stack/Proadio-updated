export default function Sitemap() { return null; }
export async function getServerSideProps({ res }) {
  let website = 'www.proaudiosolution.in';
  try {
    const { connectDB, Settings } = await import('../lib/db');
    await connectDB();
    const s = await Settings.findOne({ key:'website' }).lean();
    if (s?.value) website = s.value;
  } catch {}
  const base = `https://${website}`;
  const pages = ['','/about','/products','/events','/gallery','/contact'];
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(p=>`<url><loc>${base}${p}</loc><changefreq>weekly</changefreq><priority>${p===''?'1.0':'0.8'}</priority></url>`).join('')}</urlset>`;
  res.setHeader('Content-Type','text/xml');
  res.write(xml); res.end();
  return { props: {} };
}
