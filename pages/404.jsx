import Layout from '../components/Layout';
import Link from 'next/link';
import { getCommonProps } from '../lib/pageProps';

export default function NotFound({ site, footerPages }) {
  return (
    <Layout site={site} footerPages={footerPages} title="404 — Page Not Found" noindex>
      <div style={{ minHeight:'70vh', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'60px 24px' }}>
        <div>
          <div style={{ fontSize:'6rem', fontWeight:900, color:'var(--color-primary)', lineHeight:1 }}>404</div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', fontWeight:800, margin:'16px 0 12px' }}>Page Not Found</h1>
          <p style={{ color:'var(--color-text-light)', marginBottom:32 }}>The page you&apos;re looking for doesn&apos;t exist.</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/" className="btn btn-primary">Go Home</Link>
            <Link href="/contact" className="btn btn-secondary">Contact Us</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try { const common = await getCommonProps(); return { props: common, revalidate: 60 }; }
  catch { return { props: { site:{}, footerPages:[] } }; }
}
