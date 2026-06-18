import { SITE } from '../lib/siteData';

export default function Robots() { return null; }

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/plain');
  res.write(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api\nSitemap: https://${SITE.website}/sitemap.xml`);
  res.end();
  return { props: {} };
}
